import React, { useEffect, useRef } from 'react';

export const HolographicReportsBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
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
    // Floating report cards
    const panels = [
      { x: 0.28, y: 0.38, w: 180, h: 120, rot: -0.08, color: '#7C3AED' },
      { x: 0.50, y: 0.42, w: 220, h: 150, rot: 0.02, color: '#22D3EE' },
      { x: 0.72, y: 0.36, w: 180, h: 120, rot: 0.08, color: '#D946EF' },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.02;

      panels.forEach((p, idx) => {
        ctx.save();
        const floatY = Math.sin(t + idx * 1.5) * 10;
        ctx.translate(p.x * width, p.y * height + floatY);
        ctx.rotate(p.rot);

        // Glass panel border
        ctx.fillStyle = `${p.color}0D`;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.strokeStyle = `${p.color}4D`;
        ctx.lineWidth = 1.2;
        ctx.strokeRect(-p.w / 2, -p.h / 2, p.w, p.h);

        // Abstract chart lines inside panel
        ctx.beginPath();
        ctx.moveTo(-p.w / 2 + 15, 0);
        ctx.lineTo(-p.w / 2 + 50, -20);
        ctx.lineTo(0, 10);
        ctx.lineTo(p.w / 2 - 20, -30);
        ctx.strokeStyle = `${p.color}80`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={`relative w-full h-full pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-75" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-purple/15 rounded-full blur-[130px] pointer-events-none" />
    </div>
  );
};
