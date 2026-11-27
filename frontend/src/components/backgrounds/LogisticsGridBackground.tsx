import React, { useEffect, useRef } from 'react';

export const LogisticsGridBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Circuit logistics nodes
    const gridSize = 70;
    const pulses: { x: number; y: number; dirX: number; dirY: number; progress: number }[] = [];
    for (let i = 0; i < 22; i++) {
      pulses.push({
        x: Math.floor((Math.random() * width) / gridSize) * gridSize,
        y: Math.floor((Math.random() * height) / gridSize) * gridSize,
        dirX: Math.random() > 0.5 ? 1 : (Math.random() > 0.5 ? -1 : 0),
        dirY: 0,
        progress: 0
      });
      if (pulses[i].dirX === 0) pulses[i].dirY = Math.random() > 0.5 ? 1 : -1;
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Grid circuit lines
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Moving packet pulses
      pulses.forEach(p => {
        p.progress += 0.04;
        if (p.progress >= 1.0) {
          p.x += p.dirX * gridSize;
          p.y += p.dirY * gridSize;
          p.progress = 0;
          // Random turn at junction
          if (Math.random() > 0.4) {
            if (p.dirX !== 0) {
              p.dirY = Math.random() > 0.5 ? 1 : -1;
              p.dirX = 0;
            } else {
              p.dirX = Math.random() > 0.5 ? 1 : -1;
              p.dirY = 0;
            }
          }
          if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
            p.x = Math.floor((Math.random() * width) / gridSize) * gridSize;
            p.y = Math.floor((Math.random() * height) / gridSize) * gridSize;
          }
        }

        const currX = p.x + p.dirX * gridSize * p.progress;
        const currY = p.y + p.dirY * gridSize * p.progress;

        ctx.fillStyle = 'rgba(34, 211, 238, 0.9)';
        ctx.shadowColor = '#22D3EE';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(currX, currY, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={`relative w-full h-full pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-75" />
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[350px] bg-brand-cyan/15 rounded-full blur-[130px] pointer-events-none" />
    </div>
  );
};
