import React, { useEffect, useRef } from 'react';

export const FinancialWave: React.FC<{ className?: string }> = ({ className = '' }) => {
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

      // Emerald green wave (revenue/profit)
      ctx.beginPath();
      for (let x = 0; x <= width; x += 15) {
        const y = height * 0.5 + Math.sin(x * 0.006 + t) * 45 + Math.cos(x * 0.012 - t * 0.5) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Violet expense wave (counter-phase)
      ctx.beginPath();
      for (let x = 0; x <= width; x += 15) {
        const y = height * 0.56 + Math.cos(x * 0.007 - t * 0.8) * 40 + Math.sin(x * 0.01 + t * 0.4) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.45)';
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // Subtle candlestick bars along the baseline
      const step = 60;
      for (let x = 40; x < width - 40; x += step) {
        const osc = Math.sin(x * 0.01 + t * 2);
        const candleY = height * 0.5 + osc * 35;
        const isGreen = osc > 0;
        ctx.fillStyle = isGreen ? 'rgba(16, 185, 129, 0.25)' : 'rgba(244, 63, 94, 0.25)';
        ctx.fillRect(x - 6, candleY - 12, 12, 24);
        ctx.strokeStyle = isGreen ? 'rgba(16, 185, 129, 0.5)' : 'rgba(244, 63, 94, 0.5)';
        ctx.beginPath();
        ctx.moveTo(x, candleY - 20);
        ctx.lineTo(x, candleY + 20);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={`relative w-full h-full pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-75" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] bg-brand-emerald/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-brand-violet/15 rounded-full blur-[130px] pointer-events-none" />
    </div>
  );
};
