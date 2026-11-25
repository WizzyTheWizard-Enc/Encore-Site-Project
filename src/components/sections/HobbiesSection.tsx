import { Expand, Pencil, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { AccentPalette, HobbyEntry, PortfolioData } from '../../types/portfolio';
import { ProtectedImage } from '../ProtectedImage';

interface HobbiesSectionProps {
  data: PortfolioData['hobbies'];
  accent: AccentPalette;
  onHoverBackdropChange: (imageUrl: string | null) => void;
  onOpenEditor: () => void;
}

export function HobbiesSection({
  data,
  accent,
  onHoverBackdropChange,
  onOpenEditor,
}: HobbiesSectionProps) {
  const [selectedHobby, setSelectedHobby] = useState<HobbyEntry | null>(null);
  const [pinnedBackdropId, setPinnedBackdropId] = useState<string>(data.items[0]?.id ?? '');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedHobby(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const accentText =
    accent === 'cobalt'
      ? 'text-blue-300'
      : accent === 'glacial'
        ? 'text-cyan-300'
        : 'text-sky-300';

  const handleSelectBackdrop = (item: HobbyEntry) => {
    setPinnedBackdropId(item.id);
    onHoverBackdropChange(item.imageUrl);
  };

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

        <div className="flex flex-wrap items-center gap-3">
          {data.items.length > 0 && (
            <div className="flex items-center gap-1 rounded-lg border border-sky-400/20 bg-[#050c1d]/85 p-1">
              {data.items.map((item) => (
                <button
                  key={`bg-switch-${item.id}`}
                  type="button"
                  onClick={() => handleSelectBackdrop(item)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    pinnedBackdropId === item.id
                      ? 'bg-sky-500 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={onOpenEditor}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-400/20 bg-sky-950/35 px-4 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-sky-300/40 hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Edit Hobbies</span>
          </button>
        </div>
      </motion.div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {data.items.map((item, idx) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => {
              setPinnedBackdropId(item.id);
              onHoverBackdropChange(item.imageUrl);
            }}
            className="group overflow-hidden rounded-2xl border border-sky-400/15 bg-[#071022]/85 backdrop-blur-md transition-colors hover:border-sky-300/40"
          >
            {/* High-Definition 4:3 Protected Hobby Photograph */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#040918]">
              <ProtectedImage
                src={item.imageUrl}
                alt={item.title}
                fallbackLabel={item.title}
                className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />

              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#071022] via-transparent to-transparent opacity-80" />

              <button
                type="button"
                onClick={() => setSelectedHobby(item)}
                aria-label={`Inspect ${item.title} image`}
                className="absolute right-4 top-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-sky-300/25 bg-[#030712]/75 text-slate-200 backdrop-blur-md transition-colors hover:border-sky-300/50 hover:text-white cursor-pointer"
              >
                <Expand className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="p-7 sm:p-8">
              <div className={`flex flex-wrap items-center gap-2 text-xs ${accentText}`}>
                <span className="font-mono tabular-nums">0{idx + 1}</span>
                <span aria-hidden="true">·</span>
                <span>{item.subtitle}</span>
              </div>

              <h3 className="mt-2.5 font-display text-2xl font-semibold tracking-tight text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                {item.description}
              </p>

              {item.highlights.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-sky-400/10 pt-5 text-xs text-slate-400">
                  {item.highlights.map((highlight, hIdx) => (
                    <span key={`${item.id}-h-${hIdx}`} className="inline-flex items-center gap-3">
                      {hIdx > 0 && <span aria-hidden="true" className="text-sky-500/50">·</span>}
                      <span>{highlight}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      {/* Fullscreen Protected Lightbox Viewer */}
      <AnimatePresence>
        {selectedHobby && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedHobby(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#02050d]/90 p-4 backdrop-blur-md sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-sky-400/25 bg-[#071022]"
            >
              <button
                type="button"
                onClick={() => setSelectedHobby(null)}
                aria-label="Close preview"
                className="absolute right-4 top-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-sky-300/30 bg-[#030712]/80 text-white transition-colors hover:bg-sky-500/20 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="aspect-[16/10] w-full bg-[#040918]">
                <ProtectedImage
                  src={selectedHobby.imageUrl}
                  alt={selectedHobby.title}
                  fallbackLabel={selectedHobby.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="border-t border-sky-400/15 p-6 sm:px-8">
                <h4 className="font-display text-xl font-semibold text-white">
                  {selectedHobby.title}
                </h4>
                <p className="mt-1 text-sm text-slate-300">{selectedHobby.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
