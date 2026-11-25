import { useEffect, useRef } from 'react';
import { AccentPalette, SectionId } from '../types/portfolio';

interface StarfieldCanvasProps {
  activeSection: SectionId;
  accent: AccentPalette;
  density: number; // 1 | 2 | 3
  speed: number; // 0.5 to 2.5
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  twinkleOffset: number;
  twinkleSpeed: number;
  tint: 'white' | 'ice' | 'cobalt';
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
}

const SECTION_NEBULA_RGB: Record<SectionId, [number, number, number]> = {
  home: [14, 116, 244],
  identity: [37, 99, 235],
  contact: [6, 182, 212],
  hobbies: [56, 189, 248],
  empire: [29, 78, 216],
  secret: [15, 76, 129],
};

const ACCENT_BOOST: Record<AccentPalette, [number, number, number]> = {
  sapphire: [56, 189, 248],
  cobalt: [59, 130, 246],
  glacial: [34, 211, 238],
};

export function StarfieldCanvas({
  activeSection,
  accent,
  density,
  speed,
}: StarfieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const starCount = Math.round((density === 1 ? 140 : density === 2 ? 260 : 400) * (width > 1000 ? 1 : 0.7));
    const stars: Star[] = Array.from({ length: starCount }, (_, i) => {
      const tintRoll = i % 10;
      return {
        x: Math.random(),
        y: Math.random(),
        z: 0.2 + Math.random() * 0.8,
        size: 0.6 + Math.random() * 1.7,
        twinkleOffset: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.4 + Math.random() * 1.4,
        tint: tintRoll < 5 ? 'white' : tintRoll < 8 ? 'ice' : 'cobalt',
      };
    });

    const shootingStars: ShootingStar[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointerRef.current.targetX = e.clientX / Math.max(width, 1);
      pointerRef.current.targetY = e.clientY / Math.max(height, 1);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const t = now * 0.001;

      // Smooth pointer parallax interpolation
      pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * 0.04;
      pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * 0.04;

      const [nr, ng, nb] = SECTION_NEBULA_RGB[activeSection];
      const [ar, ag, ab] = ACCENT_BOOST[accent];

      ctx.clearRect(0, 0, width, height);

      // Subtle atmospheric deep-blue radial glow
      const glowX = width * (0.5 + (pointerRef.current.x - 0.5) * 0.08);
      const glowY = height * (0.28 + (pointerRef.current.y - 0.5) * 0.08);
      const grad = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, Math.max(width, height) * 0.72);
      grad.addColorStop(0, `rgba(${Math.round((nr + ar) / 2)}, ${Math.round((ng + ag) / 2)}, ${Math.round((nb + ab) / 2)}, 0.14)`);
      grad.addColorStop(0.5, `rgba(${nr}, ${ng}, ${nb}, 0.04)`);
      grad.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Subtle celestial orbital grid arcs
      ctx.save();
      ctx.strokeStyle = `rgba(${ar}, ${ag}, ${ab}, 0.07)`;
      ctx.lineWidth = 1;
      const arcCenterX = width * 0.78 - (pointerRef.current.x - 0.5) * 18;
      const arcCenterY = height * 0.22 - (pointerRef.current.y - 0.5) * 18;
      for (const radius of [220, 380, 560]) {
        ctx.beginPath();
        ctx.arc(arcCenterX, arcCenterY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // Render HD crisp stars
      const driftRate = prefersReducedMotion ? 0 : 0.008 * speed;
      for (const star of stars) {
        if (!prefersReducedMotion) {
          star.y -= driftRate * star.z * dt;
          if (star.y < -0.02) {
            star.y = 1.02;
            star.x = Math.random();
          }
        }

        const parallaxX = (pointerRef.current.x - 0.5) * 26 * star.z;
        const parallaxY = (pointerRef.current.y - 0.5) * 26 * star.z;
        const sx = star.x * width - parallaxX;
        const sy = star.y * height - parallaxY;

        const twinkle = prefersReducedMotion
          ? 0.85
          : 0.55 + 0.45 * Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
        const alpha = (0.35 + star.z * 0.65) * twinkle;

        if (star.tint === 'white') {
          ctx.fillStyle = `rgba(248, 250, 252, ${alpha.toFixed(3)})`;
        } else if (star.tint === 'ice') {
          ctx.fillStyle = `rgba(186, 230, 253, ${alpha.toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(${ar}, ${ag}, ${ab}, ${alpha.toFixed(3)})`;
        }

        ctx.beginPath();
        ctx.arc(sx, sy, star.size * (0.7 + star.z * 0.45), 0, Math.PI * 2);
        ctx.fill();

        // Crisp subtle 4-point gleam on brightest stars
        if (star.size > 1.9 && twinkle > 0.82) {
          ctx.strokeStyle = `rgba(224, 242, 254, ${(alpha * 0.45).toFixed(3)})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(sx - 4.5, sy);
          ctx.lineTo(sx + 4.5, sy);
          ctx.moveTo(sx, sy - 4.5);
          ctx.lineTo(sx, sy + 4.5);
          ctx.stroke();
        }
      }

      // Occasional shooting star
      if (!prefersReducedMotion && Math.random() < 0.008 * speed && shootingStars.length < 2) {
        const startX = width * (0.2 + Math.random() * 0.7);
        const startY = height * (0.05 + Math.random() * 0.35);
        shootingStars.push({
          x: startX,
          y: startY,
          vx: -420 - Math.random() * 260,
          vy: 180 + Math.random() * 140,
          life: 0,
          maxLife: 0.7 + Math.random() * 0.4,
          length: 80 + Math.random() * 60,
        });
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life += dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;

        const progress = s.life / s.maxLife;
        if (progress >= 1) {
          shootingStars.splice(i, 1);
          continue;
        }

        const fade = Math.sin(progress * Math.PI);
        const norm = Math.hypot(s.vx, s.vy);
        const tailX = s.x - (s.vx / norm) * s.length;
        const tailY = s.y - (s.vy / norm) * s.length;

        const lineGrad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        lineGrad.addColorStop(0, `rgba(224, 242, 254, ${(0.9 * fade).toFixed(3)})`);
        lineGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }

      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(render);
      }
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [activeSection, accent, density, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
