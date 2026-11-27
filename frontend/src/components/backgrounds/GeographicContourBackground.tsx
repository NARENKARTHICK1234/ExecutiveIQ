import React, { useEffect, useRef } from 'react';

export const GeographicContourBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
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
    // Regional hub points (approximate map coordinates of Mumbai, Delhi, BLR, HYD, etc.)
    const hubs = [
      { x: 0.44, y: 0.55, name: 'Mumbai', r: 6 },
      { x: 0.48, y: 0.32, name: 'Delhi', r: 5 },
      { x: 0.50, y: 0.72, name: 'Bengaluru', r: 6 },
      { x: 0.52, y: 0.60, name: 'Hyderabad', r: 5 },
      { x: 0.54, y: 0.74, name: 'Chennai', r: 5 },
      { x: 0.62, y: 0.48, name: 'Kolkata', r: 5 },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.025;

      const cx = width * 0.5;
      const cy = height * 0.52;

      // Concentric geographic contour rings
      for (let r = 70; r <= 360; r += 50) {
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.15) {
          const distortion = Math.sin(a * 4 + t + r * 0.01) * 12 + Math.cos(a * 2 - t) * 8;
          const px = cx + Math.cos(a) * (r + distortion) * 0.85;
          const py = cy + Math.sin(a) * (r + distortion) * 1.05;
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(124, 58, 237, ${Math.max(0.04, 0.22 - r * 0.0005)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Connecting hub interconnects
      ctx.beginPath();
      hubs.forEach((h1, i) => {
        hubs.forEach((h2, j) => {
          if (i < j && (Math.abs(h1.x - h2.x) < 0.18 && Math.abs(h1.y - h2.y) < 0.25)) {
            ctx.moveTo(h1.x * width, h1.y * height);
            ctx.lineTo(h2.x * width, h2.y * height);
          }
        });
      });
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Pulsing Hub Markers
      hubs.forEach((h, idx) => {
        const pulse = 1 + Math.sin(t * 3 + idx) * 0.35;
        const hx = h.x * width;
        const hy = h.y * height;

        ctx.beginPath();
        ctx.arc(hx, hy, h.r * pulse * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.15)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(hx, hy, h.r, 0, Math.PI * 2);
        ctx.fillStyle = '#22D3EE';
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none" />
    </div>
  );
};
