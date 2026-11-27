import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DataSphereProps {
  className?: string;
}

export const DataSphere: React.FC<DataSphereProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || window.innerWidth;
    const height = mountRef.current.clientHeight || window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 220;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL not available, rendering CSS fallback", e);
      return;
    }

    // 1. Data Sphere Particles (Radius ~ 65)
    const particleCount = 2800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const purpleColor = new THREE.Color(0x7C3AED);
    const cyanColor = new THREE.Color(0x22D3EE);
    const magentaColor = new THREE.Color(0xD946EF);

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution on sphere
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const radius = 68 + (Math.random() - 0.5) * 6;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color interpolation: purple to cyan and magenta
      const mixedColor = i % 3 === 0 ? purpleColor : (i % 3 === 1 ? cyanColor : magentaColor);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const spherePoints = new THREE.Points(geometry, material);
    scene.add(spherePoints);

    // 2. Glowing Orbital Rings
    const ringsGroup = new THREE.Group();
    const ringRadii = [82, 96, 110];
    const ringColors = [0x22D3EE, 0xA855F7, 0x3B82F6];

    ringRadii.forEach((r, idx) => {
      const ringGeo = new THREE.BufferGeometry();
      const ringPointsCount = 240;
      const ringPos = new Float32Array(ringPointsCount * 3);
      for (let j = 0; j < ringPointsCount; j++) {
        const angle = (j / ringPointsCount) * Math.PI * 2;
        ringPos[j * 3] = Math.cos(angle) * r;
        ringPos[j * 3 + 1] = (Math.sin(angle) * r) * 0.35; // Tilted ellipse
        ringPos[j * 3 + 2] = Math.sin(angle) * r;
      }
      ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
      const ringMat = new THREE.PointsMaterial({
        size: 1.6,
        color: ringColors[idx],
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Points(ringGeo, ringMat);
      ring.rotation.x = 0.4 * (idx + 1);
      ring.rotation.y = 0.25 * (idx + 1);
      ringsGroup.add(ring);
    });
    scene.add(ringsGroup);

    // 3. Central Glowing Core Node
    const coreGeo = new THREE.SphereGeometry(18, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x7C3AED,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const coreSphere = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreSphere);

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0004;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0004;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!mountRef.current || !renderer) return;
      const w = mountRef.current.clientWidth || window.innerWidth;
      const h = mountRef.current.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Rotate sphere
      spherePoints.rotation.y += 0.0025;
      spherePoints.rotation.x += 0.001;

      // Parallax easing
      spherePoints.rotation.y += (mouseX - spherePoints.rotation.y * 0.1) * 0.05;
      spherePoints.rotation.x += (mouseY - spherePoints.rotation.x * 0.1) * 0.05;

      // Rotate orbital rings
      ringsGroup.rotation.y -= 0.0035;
      ringsGroup.rotation.z += 0.0015;

      coreSphere.rotation.y += 0.005;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full pointer-events-none overflow-hidden ${className}`}>
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 z-0 flex items-center justify-center opacity-90" />
      
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-brand-cyan/20 rounded-full blur-[110px] pointer-events-none" />
    </div>
  );
};
