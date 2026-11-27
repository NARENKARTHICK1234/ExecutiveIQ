import React, { useEffect, useRef } from 'react';

export const WorkforceBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
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
    const figures = [
      { x: 0.18, color: 'rgba(124, 58, 237, ' },
      { x: 0.34, color: 'rgba(34, 211, 238, ' },
      { x: 0.50, color: 'rgba(217, 70, 239, ' },
      { x: 0.66, color: 'rgba(37, 99, 235, ' },
      { x: 0.82, color: 'rgba(168, 85, 247, ' },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.02;

      const baseY = height * 0.72;

      // Connecting hierarchy lines
      ctx.beginPath();
      figures.forEach((f, idx) => {
        const fx = f.x * width;
        const fy = baseY - 60 + Math.sin(t + idx) * 8;
        if (idx === 0) ctx.moveTo(fx, fy);
        else ctx.lineTo(fx, fy);
      });
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Stylized digital human node silhouettes
      figures.forEach((f, idx) => {
        const fx = f.x * width;
        const fy = baseY - 60 + Math.sin(t + idx) * 8;

        // Head node
        ctx.beginPath();
        ctx.arc(fx, fy - 22, 9, 0, Math.PI * 2);
        ctx.fillStyle = `${f.color}0.85)`;
        ctx.fill();

        // Torso / body arch
        ctx.beginPath();
        ctx.moveTo(fx - 14, fy + 24);
        ctx.quadraticCurveTo(fx, fy - 8, fx + 14, fy + 24);
        ctx.strokeStyle = `${f.color}0.65)`;
        ctx.lineWidth = 3.5;
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={`relative w-full h-full pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-70" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-violet/15 rounded-full blur-[130px] pointer-events-none" />
    </div>
  );
};
