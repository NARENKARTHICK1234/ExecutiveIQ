import React, { useEffect, useRef } from 'react';

export const ProductCubesBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let t = 0;
    // Isometric cubes
    const cubes = [
      { x: 0.22, y: 0.35, size: 36, speed: 1.0, color: '#7C3AED' },
      { x: 0.50, y: 0.28, size: 52, speed: 0.7, color: '#22D3EE' },
      { x: 0.78, y: 0.42, size: 40, speed: 1.2, color: '#A855F7' },
      { x: 0.35, y: 0.68, size: 45, speed: 0.9, color: '#3B82F6' },
      { x: 0.68, y: 0.65, size: 48, speed: 0.8, color: '#D946EF' },
    ];

    const drawIsoCube = (cx: number, cy: number, size: number, color: string) => {
      const h = size * 0.577; // tan(30 deg)
      
      // Top face
      ctx.beginPath();
      ctx.moveTo(cx, cy - size);
      ctx.lineTo(cx + size, cy - size + h);
      ctx.lineTo(cx, cy - size + 2 * h);
      ctx.lineTo(cx - size, cy - size + h);
      ctx.closePath();
      ctx.fillStyle = `${color}35`;
      ctx.fill();
      ctx.strokeStyle = `${color}80`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Left face
      ctx.beginPath();
      ctx.moveTo(cx - size, cy - size + h);
      ctx.lineTo(cx, cy - size + 2 * h);
      ctx.lineTo(cx, cy + h);
      ctx.lineTo(cx - size, cy);
      ctx.closePath();
      ctx.fillStyle = `${color}20`;
      ctx.fill();
      ctx.stroke();

      // Right face
      ctx.beginPath();
      ctx.moveTo(cx + size, cy - size + h);
      ctx.lineTo(cx, cy - size + 2 * h);
      ctx.lineTo(cx, cy + h);
      ctx.lineTo(cx + size, cy);
      ctx.closePath();
      ctx.fillStyle = `${color}15`;
      ctx.fill();
      ctx.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.02;

      cubes.forEach((c, idx) => {
        const floatY = Math.sin(t * c.speed + idx) * 14;
        drawIsoCube(c.x * width, c.y * height + floatY, c.size, c.color);
      });

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={`relative w-full h-full pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-75" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-brand-purple/15 rounded-full blur-[130px] pointer-events-none" />
    </div>
  );
};
