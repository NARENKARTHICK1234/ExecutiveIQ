import React, { useEffect, useRef } from 'react';

export const DatabasePipelineBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
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
    const cylinders = [
      { x: 0.32, y: 0.45, w: 90, h: 110, color: '#7C3AED' },
      { x: 0.50, y: 0.38, w: 110, h: 140, color: '#22D3EE' },
      { x: 0.68, y: 0.48, w: 90, h: 110, color: '#D946EF' },
    ];

    const drawDatabaseCylinder = (cx: number, cy: number, w: number, h: number, color: string) => {
      const rx = w / 2;
      const ry = 18;

      // Vertical body
      ctx.beginPath();
      ctx.ellipse(cx, cy - h / 2, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}90`;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Middle rings
      [-0.15, 0.2].forEach(ratio => {
        ctx.beginPath();
        ctx.ellipse(cx, cy + h * ratio, rx, ry, 0, 0, Math.PI);
        ctx.strokeStyle = `${color}60`;
        ctx.stroke();
      });

      // Bottom rim
      ctx.beginPath();
      ctx.ellipse(cx, cy + h / 2, rx, ry, 0, 0, Math.PI);
      ctx.strokeStyle = `${color}90`;
      ctx.stroke();

      // Side lines
      ctx.beginPath();
      ctx.moveTo(cx - rx, cy - h / 2);
      ctx.lineTo(cx - rx, cy + h / 2);
      ctx.moveTo(cx + rx, cy - h / 2);
      ctx.lineTo(cx + rx, cy + h / 2);
      ctx.strokeStyle = `${color}80`;
      ctx.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.02;

      // Connecting data pipeline streams
      ctx.beginPath();
      ctx.moveTo(cylinders[0].x * width, cylinders[0].y * height);
      ctx.lineTo(cylinders[1].x * width, cylinders[1].y * height);
      ctx.lineTo(cylinders[2].x * width, cylinders[2].y * height);
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();

      cylinders.forEach((cyl, idx) => {
        const floatY = Math.sin(t * 1.5 + idx) * 8;
        drawDatabaseCylinder(cyl.x * width, cyl.y * height + floatY, cyl.w, cyl.h, cyl.color);
      });

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={`relative w-full h-full pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] bg-brand-cyan/15 rounded-full blur-[130px] pointer-events-none" />
    </div>
  );
};
