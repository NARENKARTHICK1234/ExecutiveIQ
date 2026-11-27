import React, { useEffect, useRef } from 'react';

export const PredictionWaveBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
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
      t += 0.02;

      // Base historical curve
      ctx.beginPath();
      for (let x = 0; x <= width * 0.6; x += 15) {
        const y = height * 0.65 - (x / width) * 120 + Math.sin(x * 0.01 + t) * 18;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.55)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Projected prediction fan (upper bound, base, lower bound)
      const splitX = width * 0.6;
      const splitY = height * 0.65 - (splitX / width) * 120 + Math.sin(splitX * 0.01 + t) * 18;

      // Upper bound (optimistic)
      ctx.beginPath();
      ctx.moveTo(splitX, splitY);
      for (let x = splitX; x <= width; x += 15) {
        const progress = (x - splitX) / (width - splitX);
        const y = splitY - progress * 130 + Math.sin(x * 0.015 + t * 1.5) * 12;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.4)';
      ctx.setLineDash([4, 4]);
      ctx.stroke();

      // Base line
      ctx.beginPath();
      ctx.moveTo(splitX, splitY);
      for (let x = splitX; x <= width; x += 15) {
        const progress = (x - splitX) / (width - splitX);
        const y = splitY - progress * 90 + Math.sin(x * 0.012 + t * 1.2) * 10;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.8)';
      ctx.setLineDash([]);
      ctx.lineWidth = 3;
      ctx.stroke();

      // Lower bound (conservative)
      ctx.beginPath();
      ctx.moveTo(splitX, splitY);
      for (let x = splitX; x <= width; x += 15) {
        const progress = (x - splitX) / (width - splitX);
        const y = splitY - progress * 45 + Math.sin(x * 0.01 + t) * 12;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(217, 70, 239, 0.4)';
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Glowing nexus node at transition point
      ctx.beginPath();
      ctx.arc(splitX, splitY, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#22D3EE';
      ctx.shadowColor = '#22D3EE';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={`relative w-full h-full pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />
      <div className="absolute top-1/2 right-1/4 w-[550px] h-[350px] bg-brand-cyan/15 rounded-full blur-[130px] pointer-events-none" />
    </div>
  );
};
