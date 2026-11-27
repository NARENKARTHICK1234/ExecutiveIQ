import React, { useEffect, useRef } from 'react';

export const SalesStreamBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let time = 0;
    const barsCount = 36;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.03;

      const barWidth = width / (barsCount * 1.8);
      const gap = (width - barsCount * barWidth) / (barsCount + 1);

      // Render vertical glowing sales stream bars
      for (let i = 0; i < barsCount; i++) {
        const x = gap + i * (barWidth + gap);
        const heightMult = (Math.sin(i * 0.3 + time) + Math.cos(i * 0.2 - time * 0.5) + 2) / 4;
        const barHeight = height * 0.45 * heightMult;
        const y = height - barHeight - 40;

        const grad = ctx.createLinearGradient(x, y + barHeight, x, y);
        grad.addColorStop(0, 'rgba(124, 58, 237, 0.05)');
        grad.addColorStop(0.7, 'rgba(168, 85, 247, 0.25)');
        grad.addColorStop(1, 'rgba(34, 211, 238, 0.75)');

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, barHeight);

        // Highlight top glowing cap
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(x, y, barWidth, 2);
      }

      // Connecting upward exponential trend line
      ctx.beginPath();
      for (let i = 0; i < barsCount; i++) {
        const x = gap + i * (barWidth + gap) + barWidth / 2;
        const heightMult = (Math.sin(i * 0.3 + time) + Math.cos(i * 0.2 - time * 0.5) + 2) / 4;
        const y = height - (height * 0.45 * heightMult) - 40;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(217, 70, 239, 0.45)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={`relative w-full h-full pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-70" />
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[350px] bg-brand-magenta/15 rounded-full blur-[130px] pointer-events-none" />
    </div>
  );
};
