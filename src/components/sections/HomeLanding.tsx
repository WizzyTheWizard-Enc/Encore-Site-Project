import { ArrowRight, ChevronRight, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { AccentPalette, PortfolioData, SectionId } from '../../types/portfolio';
import { ProtectedImage } from '../ProtectedImage';

interface HomeLandingProps {
  data: PortfolioData;
  onNavigate: (section: SectionId) => void;
  accent: AccentPalette;
}

const ACCENT_CTA: Record<AccentPalette, string> = {
  sapphire: 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-[0_0_32px_rgba(56,189,248,0.34)]',
  cobalt: 'bg-blue-500 hover:bg-blue-400 text-slate-950 shadow-[0_0_32px_rgba(59,130,246,0.34)]',
  glacial: 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_32px_rgba(34,211,238,0.34)]',
};

const ACCENT_TEXT: Record<AccentPalette, string> = {
  sapphire: 'text-sky-300',
  cobalt: 'text-blue-300',
  glacial: 'text-cyan-300',
};

export function HomeLanding({ data, onNavigate, accent }: HomeLandingProps) {
  const slides = data.home.propaganda;
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveSlideIdx((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const currentSlide = slides[activeSlideIdx] ?? slides[0];

  const quickIndex: Array<{ id: Exclude<SectionId, 'home'>; num: string; title: string; desc: string }> = [
    {
      id: 'identity',
      num: '01',
      title: 'Emperor Profile',
      desc: `${data.identity.fullName} · NIT ${data.identity.nit} · ${data.identity.classMajor}`,
    },
    {
      id: 'contact',
      num: '02',
      title: 'Contact & Info',
      desc: 'Phone, Instagram, LinkedIn & official channel',
    },
    {
      id: 'hobbies',
      num: '03',
      title: 'Hobbies',
      desc: 'Playing games & reading strategic literature',
    },
    {
      id: 'empire',
      num: '04',
      title: 'Galactic Empire',
      desc: 'Conquering star systems & cosmic resource wealth',
    },
    {
      id: 'secret',
      num: '05',
      title: data.secret.menuLabel || 'TOP Secret',
      desc: 'Level 5 classified imperial archive',
    },
  ];

  return (
    <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-between px-4 py-10 sm:px-8 lg:py-16">
      {/* Main Galactic Empire Advertisement Split */}
      <div className="grid items-stretch gap-10 lg:grid-cols-12">
        {/* Left Imperial Proclamation & Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center lg:col-span-6"
        >
          <p className={`font-mono text-xs tracking-wider ${ACCENT_TEXT[accent]} tabular-nums`}>
            {data.home.kicker}
          </p>

          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
            {data.home.headline}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {data.home.summary}
          </p>

          {/* Primary Call to Action -> Emperor Profile */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('identity')}
              className={`inline-flex items-center gap-2.5 rounded-lg px-6 py-3.5 text-sm font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 ${ACCENT_CTA[accent]}`}
            >
              <span>{data.home.ctaLabel}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.button>

            <button
              type="button"
              onClick={() => onNavigate('empire')}
              className="inline-flex items-center gap-2 rounded-lg border border-sky-400/25 bg-sky-950/35 px-5 py-3.5 text-sm font-medium text-slate-200 transition-colors duration-150 hover:border-sky-300/50 hover:bg-sky-900/45 hover:text-white whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >
              <span>{data.home.secondaryLabel}</span>
            </button>
          </div>
        </motion.div>

        {/* Right Featured Conquering Propaganda Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between overflow-hidden rounded-2xl border border-sky-400/25 bg-[#060e20]/85 shadow-[0_0_60px_rgba(14,165,233,0.12)] lg:col-span-6"
        >
          {currentSlide && (
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#030712]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full"
                >
                  <ProtectedImage
                    src={currentSlide.imageUrl}
                    alt={currentSlide.title}
                    fallbackLabel={currentSlide.title}
                    className="h-full w-full object-cover object-center"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Scrim for guaranteed 4.5:1 text legibility */}
              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#030712] via-[#030712]/35 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 z-30 p-6 sm:p-7">
                <div className={`flex items-center gap-2 font-mono text-xs ${ACCENT_TEXT[accent]} tabular-nums`}>
                  <span>{currentSlide.code}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentSlide.directive}</span>
                </div>
                <h2 className="mt-1.5 font-display text-xl font-semibold text-white sm:text-2xl">
                  {currentSlide.title}
                </h2>
                <p className="mt-2 max-w-lg text-xs leading-relaxed text-slate-200 sm:text-sm">
                  {currentSlide.promise}
                </p>
              </div>
            </div>
          )}

          {/* 4-Card Propaganda Switcher Strip */}
          <div className="grid grid-cols-2 gap-2 border-t border-sky-400/15 bg-[#040917]/95 p-3 sm:grid-cols-4">
            {slides.map((slide, idx) => {
              const isActive = idx === activeSlideIdx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveSlideIdx(idx)}
                  className={`group relative overflow-hidden rounded-lg border text-left transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'border-sky-400 bg-sky-500/15'
                      : 'border-sky-400/15 bg-[#060d1f] opacity-75 hover:border-sky-400/40 hover:opacity-100'
                  }`}
                >
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <ProtectedImage
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-2 py-1.5">
                    <span className="block truncate font-mono text-[11px] font-medium text-sky-200">
                      {slide.code}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Imperial Expansion Promises Row */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 grid gap-5 rounded-2xl border border-sky-400/15 bg-[#050d1e]/75 p-6 backdrop-blur-md md:grid-cols-3 sm:p-8"
      >
        {data.home.promises.map((promise, idx) => (
          <div
            key={promise.id}
            className="flex flex-col justify-between gap-2 border-sky-400/10 md:border-r md:pr-6 last:border-r-0 last:pr-0"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-sky-300/90 tabular-nums">
              <ShieldCheck className="h-4 w-4 text-sky-400" aria-hidden="true" />
              <span>Promise 0{idx + 1}</span>
            </div>
            <h3 className="mt-1 font-display text-lg font-semibold text-white">
              {promise.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              {promise.summary}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Clean Minimalist Bottom Directory Strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 border-t border-sky-400/15 pt-8"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {quickIndex.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className="group flex flex-col items-start text-left transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
            >
              <div className="flex w-full items-center justify-between">
                <span className="font-mono text-xs text-sky-400/80 tabular-nums">{item.num}</span>
                <ChevronRight
                  className="h-3.5 w-3.5 text-sky-400/0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-sky-300"
                  aria-hidden="true"
                />
              </div>
              <span className="mt-1.5 font-display text-base font-medium text-slate-100 transition-colors group-hover:text-sky-300">
                {item.title}
              </span>
              <span className="mt-1 text-xs leading-relaxed text-slate-400 line-clamp-2">
                {item.desc}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
