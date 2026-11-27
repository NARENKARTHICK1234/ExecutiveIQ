import React, { useEffect, useRef } from 'react';

export const AuroraMeshBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
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
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.015;

      // Multi-ribbon glowing aurora lines
      for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        const baseH = height * 0.45 + i * 20;
        for (let x = 0; x <= width; x += 20) {
          const y = baseH + Math.sin(x * 0.004 + t + i * 0.5) * 55 + Math.cos(x * 0.008 - t * 0.6) * 30;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const colors = [
          'rgba(124, 58, 237, 0.25)',
          'rgba(168, 85, 247, 0.25)',
          'rgba(34, 211, 238, 0.25)',
          'rgba(217, 70, 239, 0.25)',
          'rgba(37, 99, 235, 0.25)',
          'rgba(16, 185, 129, 0.20)',
          'rgba(124, 58, 237, 0.20)',
        ];
        ctx.strokeStyle = colors[i % colors.length];
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={`relative w-full h-full pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />
      <div className="absolute top-1/2 left-1/3 w-[650px] h-[350px] bg-brand-violet/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-brand-cyan/15 rounded-full blur-[130px] pointer-events-none" />
    </div>
  );
};
