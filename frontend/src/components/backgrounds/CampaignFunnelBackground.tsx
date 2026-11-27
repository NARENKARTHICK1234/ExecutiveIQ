import React, { useEffect, useRef } from 'react';

export const CampaignFunnelBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
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
    const particles: { x: number; y: number; speed: number; radius: number; color: string }[] = [];
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.6 + Math.random() * 1.5,
        radius: 1.2 + Math.random() * 2.2,
        color: Math.random() > 0.5 ? 'rgba(217, 70, 239, ' : 'rgba(34, 211, 238, '
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.02;

      const centerX = width / 2;
      const topY = height * 0.2;
      const bottomY = height * 0.85;

      // Draw funnel outline arcs
      const topWidth = Math.min(width * 0.6, 500);
      const bottomWidth = topWidth * 0.25;

      ctx.beginPath();
      ctx.moveTo(centerX - topWidth / 2, topY);
      ctx.lineTo(centerX - bottomWidth / 2, bottomY);
      ctx.lineTo(centerX + bottomWidth / 2, bottomY);
      ctx.lineTo(centerX + topWidth / 2, topY);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(217, 70, 239, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Flowing funnel particles converging inwards
      particles.forEach(p => {
        p.y += p.speed;
        if (p.y > bottomY + 50) {
          p.y = topY - 20;
          p.x = centerX + (Math.random() - 0.5) * topWidth;
        }

        // Funnel boundary constriction
        const progress = Math.max(0, Math.min(1, (p.y - topY) / (bottomY - topY)));
        const currentMaxWidth = (topWidth * (1 - progress) + bottomWidth * progress) * 0.5;
        const currentDist = p.x - centerX;
        if (Math.abs(currentDist) > currentMaxWidth) {
          p.x = centerX + Math.sign(currentDist) * currentMaxWidth;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}0.75)`;
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
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-brand-magenta/15 rounded-full blur-[130px] pointer-events-none" />
    </div>
  );
};
