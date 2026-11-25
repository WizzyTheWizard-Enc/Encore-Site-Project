import { Orbit, Pencil } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { AccentPalette, PortfolioData } from '../../types/portfolio';
import { ProtectedImage } from '../ProtectedImage';

interface EmpireSectionProps {
  data: PortfolioData['empire'];
  accent: AccentPalette;
  onOpenEditor: () => void;
}

export function EmpireSection({ data, accent, onOpenEditor }: EmpireSectionProps) {
  const [activePillarId, setActivePillarId] = useState<string>(data.pillars[0]?.id ?? '');

  const activePillar =
    data.pillars.find((p) => p.id === activePillarId) ?? data.pillars[0];

  const accentBorder =
    accent === 'cobalt'
      ? 'border-blue-400/55 bg-blue-500/12 shadow-[0_0_24px_rgba(59,130,246,0.18)]'
      : accent === 'glacial'
        ? 'border-cyan-300/55 bg-cyan-400/12 shadow-[0_0_24px_rgba(34,211,238,0.18)]'
        : 'border-sky-400/55 bg-sky-500/12 shadow-[0_0_24px_rgba(56,189,248,0.18)]';

  const accentText =
    accent === 'cobalt'
      ? 'text-blue-300'
      : accent === 'glacial'
        ? 'text-cyan-300'
        : 'text-sky-300';

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-end justify-between gap-6 border-b border-sky-400/15 pb-8"
      >
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {data.sectionTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
            {data.sectionSubtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenEditor}
          className="inline-flex items-center gap-2 rounded-lg border border-sky-400/20 bg-sky-950/35 px-4 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-sky-300/40 hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Edit Empire Plan</span>
        </button>
      </motion.div>

      {/* Featured Cosmic Armada Visual + Manifesto */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 grid items-stretch gap-8 lg:grid-cols-12"
      >
        <div className="relative overflow-hidden rounded-2xl border border-sky-400/20 bg-[#050b19] lg:col-span-7">
          <div className="h-full min-h-[280px] w-full">
            <ProtectedImage
              src={data.backdropUrl}
              alt="Galactic Empire armada orbiting a ringed blue planet"
              fallbackLabel="Galactic Empire Armada"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#030712]/90 via-[#030712]/25 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 p-6 sm:p-8">
            <span className={`font-mono text-xs ${accentText}`}>
              Grand Strategy · Sovereign Expansion
            </span>
            <h3 className="mt-1.5 font-display text-2xl font-semibold text-white">
              Conquer Star Systems. Harvest Cosmic Wealth.
            </h3>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-sky-400/15 bg-[#071022]/85 p-7 backdrop-blur-md sm:p-9 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Imperial Manifesto</span>
              <Orbit className="h-5 w-5 text-sky-400/80" aria-hidden="true" />
            </div>

            <p className="mt-5 text-base leading-relaxed text-slate-200">
              {data.manifesto}
            </p>
          </div>

          {activePillar && (
            <div className="mt-8 border-t border-sky-400/15 pt-6">
              <span className="font-mono text-xs text-slate-400">
                Selected Directive · {activePillar.code}
              </span>
              <p className="mt-1.5 font-display text-lg font-semibold text-white">
                {activePillar.title}
              </p>
              <p className={`mt-1 font-mono text-xs tabular-nums ${accentText}`}>
                Target: {activePillar.targetMetric}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Strategic Pillars Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {data.pillars.map((pillar, idx) => {
          const isSelected = activePillar?.id === pillar.id;
          return (
            <motion.button
              key={pillar.id}
              type="button"
              onClick={() => setActivePillarId(pillar.id)}
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col justify-between rounded-2xl border p-6 text-left transition-all duration-150 cursor-pointer ${
                isSelected
                  ? accentBorder
                  : 'border-sky-400/15 bg-[#060e1f]/80 hover:border-sky-400/35 hover:bg-[#081329]/85'
              }`}
            >
              <div>
                <span className={`font-mono text-xs tabular-nums ${accentText}`}>
                  {pillar.code}
                </span>
                <h4 className="mt-2 font-display text-lg font-semibold text-white">
                  {pillar.title}
                </h4>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  {pillar.summary}
                </p>
              </div>

              <div className="mt-5 border-t border-sky-400/10 pt-3 font-mono text-xs text-slate-400 tabular-nums">
                {pillar.targetMetric}
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
