import React, { useEffect, useRef } from 'react';

export const ParticleWave: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const cols = 55;
    const rows = 28;
    let step = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step += 0.025;

      const xSpacing = width / cols;
      const ySpacing = (height * 0.7) / rows;
      const baseY = height * 0.45;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const x = c * xSpacing;
          const wave1 = Math.sin(c * 0.18 + step + r * 0.12) * 28;
          const wave2 = Math.cos(c * 0.12 - step * 0.8 + r * 0.08) * 18;
          const y = baseY + r * ySpacing + wave1 + wave2;

          if (c === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        const alpha = Math.max(0.04, (r / rows) * 0.28);
        ctx.strokeStyle = r % 2 === 0 ? `rgba(124, 58, 237, ${alpha})` : `rgba(34, 211, 238, ${alpha * 0.8})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`relative w-full h-full pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-brand-purple/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[280px] bg-brand-cyan/15 rounded-full blur-[110px] pointer-events-none" />
    </div>
  );
};
