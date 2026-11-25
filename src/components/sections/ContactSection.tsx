import { Check, Copy, ExternalLink, Mail, Pencil, Phone, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { AccentPalette, ContactEntry, PortfolioData } from '../../types/portfolio';

interface ContactSectionProps {
  data: PortfolioData['contact'];
  accent: AccentPalette;
  onOpenEditor: () => void;
}

export function ContactSection({ data, accent, onOpenEditor }: ContactSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (entry: ContactEntry) => {
    try {
      await navigator.clipboard.writeText(entry.displayValue);
      setCopiedId(entry.id);
      setTimeout(() => setCopiedId((prev) => (prev === entry.id ? null : prev)), 1800);
    } catch {
      // Clipboard fallback unavailable
    }
  };

  const renderIcon = (kind: ContactEntry['kind']) => {
    if (kind === 'phone') return <Phone className="h-4 w-4 text-sky-300" aria-hidden="true" />;
    if (kind === 'email') return <Mail className="h-4 w-4 text-sky-300" aria-hidden="true" />;
    return <Share2 className="h-4 w-4 text-sky-300" aria-hidden="true" />;
  };

  const accentBorderHover =
    accent === 'cobalt'
      ? 'hover:border-blue-400/40'
      : accent === 'glacial'
        ? 'hover:border-cyan-300/40'
        : 'hover:border-sky-400/40';

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
          <span>Edit Contact</span>
        </button>
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {data.entries.map((entry, idx) => {
          const isExternal = entry.href.startsWith('http');
          const isCopied = copiedId === entry.id;

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col justify-between rounded-2xl border border-sky-400/15 bg-[#071022]/82 p-7 backdrop-blur-md transition-colors duration-150 ${accentBorderHover}`}
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    {renderIcon(entry.kind)}
                    <span className="text-xs font-medium text-slate-300">{entry.label}</span>
                  </div>
                  <span className="font-mono text-xs text-slate-500 tabular-nums">
                    0{idx + 1}
                  </span>
                </div>

                <p className="mt-4 break-all font-display text-xl font-semibold text-white sm:text-2xl">
                  {entry.displayValue}
                </p>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {entry.note}
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-sky-400/10 pt-5">
                <a
                  href={entry.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 rounded-lg bg-sky-500/15 px-4 py-2 text-xs font-semibold text-sky-200 transition-colors hover:bg-sky-500/25 hover:text-white whitespace-nowrap shrink-0"
                >
                  <span>
                    {entry.kind === 'phone'
                      ? 'Call Number'
                      : entry.kind === 'email'
                        ? 'Send Email'
                        : 'Open Profile'}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => handleCopy(entry)}
                  className="inline-flex items-center gap-2 rounded-lg border border-sky-400/20 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-sky-300/40 hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />
                      <span className="text-sky-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
