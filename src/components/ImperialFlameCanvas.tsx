import { useEffect, useRef } from 'react';

interface EmberParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  hue: 'crimson' | 'amber' | 'gold' | 'plasma';
  swayOffset: number;
}

export function ImperialFlameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    resize();
    window.addEventListener('resize', resize);

    const spawnEmber = (initial = false): EmberParticle => {
      const roll = Math.random();
      const hue: EmberParticle['hue'] =
        roll < 0.36 ? 'amber' : roll < 0.68 ? 'crimson' : roll < 0.88 ? 'gold' : 'plasma';

      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : height + 10 + Math.random() * 40,
        vx: (Math.random() - 0.5) * 32,
        vy: -(55 + Math.random() * 135),
        size: 1.1 + Math.random() * 2.8,
        life: initial ? Math.random() * 2.5 : 0,
        maxLife: 2.8 + Math.random() * 3.4,
        hue,
        swayOffset: Math.random() * Math.PI * 2,
      };
    };

    const emberCount = width > 1000 ? 115 : 65;
    const embers: EmberParticle[] = Array.from({ length: emberCount }, () => spawnEmber(true));

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const t = now * 0.001;

      ctx.clearRect(0, 0, width, height);

      // Fiery imperial forge underglow along the bottom horizon
      const pulse = prefersReducedMotion ? 1 : 0.88 + 0.12 * Math.sin(t * 2.2);
      const baseGlow = ctx.createLinearGradient(0, height * 0.52, 0, height);
      baseGlow.addColorStop(0, 'rgba(127, 29, 29, 0)');
      baseGlow.addColorStop(0.55, `rgba(185, 28, 28, ${(0.09 * pulse).toFixed(3)})`);
      baseGlow.addColorStop(0.85, `rgba(234, 88, 12, ${(0.18 * pulse).toFixed(3)})`);
      baseGlow.addColorStop(1, `rgba(249, 115, 22, ${(0.28 * pulse).toFixed(3)})`);
      ctx.fillStyle = baseGlow;
      ctx.fillRect(0, height * 0.52, width, height * 0.48);

      // Subtle roaring flame tongues near bottom corners
      const flameWaves = 5;
      for (let w = 0; w < flameWaves; w++) {
        const cx = width * ((w + 0.5) / flameWaves) + (prefersReducedMotion ? 0 : Math.sin(t * 1.4 + w) * 28);
        const cy = height * 0.96;
        const r = Math.min(width, height) * (0.28 + (w % 2) * 0.08);
        const flameGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        flameGrad.addColorStop(0, `rgba(251, 146, 60, ${(0.14 * pulse).toFixed(3)})`);
        flameGrad.addColorStop(0.45, `rgba(220, 38, 38, ${(0.08 * pulse).toFixed(3)})`);
        flameGrad.addColorStop(1, 'rgba(220, 38, 38, 0)');
        ctx.fillStyle = flameGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Rising embers and plasma sparks
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        if (!prefersReducedMotion) {
          e.life += dt;
          e.x += (e.vx + Math.sin(t * 2.5 + e.swayOffset) * 22) * dt;
          e.y += e.vy * dt;
          if (e.life >= e.maxLife || e.y < -20) {
            embers[i] = spawnEmber(false);
            continue;
          }
        }

        const progress = e.life / e.maxLife;
        const alpha = Math.sin(Math.min(progress, 1) * Math.PI) * 0.9;

        let color = `rgba(251, 146, 60, ${alpha.toFixed(3)})`;
        let glowColor = `rgba(249, 115, 22, ${(alpha * 0.35).toFixed(3)})`;
        if (e.hue === 'crimson') {
          color = `rgba(248, 113, 113, ${alpha.toFixed(3)})`;
          glowColor = `rgba(220, 38, 38, ${(alpha * 0.35).toFixed(3)})`;
        } else if (e.hue === 'gold') {
          color = `rgba(253, 224, 71, ${alpha.toFixed(3)})`;
          glowColor = `rgba(234, 179, 8, ${(alpha * 0.35).toFixed(3)})`;
        } else if (e.hue === 'plasma') {
          color = `rgba(56, 189, 248, ${(alpha * 0.85).toFixed(3)})`;
          glowColor = `rgba(14, 165, 233, ${(alpha * 0.3).toFixed(3)})`;
        }

        // Ember aura
        ctx.fillStyle = glowColor;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 3.1, 0, Math.PI * 2);
        ctx.fill();

        // Bright core spark
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(render);
      }
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
    />
  );
}
