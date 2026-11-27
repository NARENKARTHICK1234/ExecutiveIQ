import React, { useEffect, useRef } from 'react';

export const CustomerNetworkBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Orbiting user nodes
    const nodes: { angle: number; radius: number; speed: number; size: number; color: string }[] = [];
    for (let i = 0; i < 48; i++) {
      nodes.push({
        angle: Math.random() * Math.PI * 2,
        radius: 80 + Math.random() * 260,
        speed: (0.004 + Math.random() * 0.008) * (Math.random() > 0.5 ? 1 : -1),
        size: 2.0 + Math.random() * 3.5,
        color: Math.random() > 0.4 ? 'rgba(124, 58, 237, ' : 'rgba(37, 99, 235, '
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height * 0.48;

      // Central glowing client core
      const corePulse = 16 + Math.sin(Date.now() * 0.003) * 3;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 35);
      grad.addColorStop(0, 'rgba(168, 85, 247, 0.8)');
      grad.addColorStop(0.5, 'rgba(124, 58, 237, 0.3)');
      grad.addColorStop(1, 'rgba(124, 58, 237, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 35, 0, Math.PI * 2);
      ctx.fill();

      // Orbital circles
      [120, 190, 260].forEach(r => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(124, 58, 237, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Connecting arcs and nodes
      nodes.forEach((n, idx) => {
        n.angle += n.speed;
        const x = cx + Math.cos(n.angle) * n.radius;
        const y = cy + Math.sin(n.angle) * n.radius;

        // Radiating line to center occasionally
        if (idx % 3 === 0) {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(x, y);
          ctx.strokeStyle = `${n.color}0.15)`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(x, y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color}0.8)`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={`relative w-full h-full pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-purple/15 rounded-full blur-[130px] pointer-events-none" />
    </div>
  );
};
