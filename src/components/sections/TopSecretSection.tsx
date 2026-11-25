import { ArrowUpRight, Eye, Fingerprint, Lock, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { PortfolioData } from '../../types/portfolio';

interface TopSecretSectionProps {
  data: PortfolioData['secret'];
}

export function TopSecretSection({ data }: TopSecretSectionProps) {
  const [clearanceChecked, setClearanceChecked] = useState(false);

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center px-4 py-14 sm:px-8 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl border border-sky-400/30 bg-[#040814]/92 p-7 shadow-[0_0_70px_rgba(14,165,233,0.14)] backdrop-blur-xl sm:p-11"
      >
        {/* Subtle vault header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sky-400/15 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-sky-400/35 bg-sky-950/70 text-sky-300">
              <Lock className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-wider text-sky-300/90">
                {data.classificationBanner}
              </p>
              <h2 className="mt-0.5 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {data.sectionTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-400 tabular-nums">
            <Fingerprint className="h-4 w-4 text-sky-400/80" aria-hidden="true" />
            <span>ARCHIVE REF · 22-41-375-X</span>
          </div>
        </div>

        {/* Classified Briefing */}
        <div className="mt-8 space-y-6">
          <p className="max-w-3xl text-base leading-relaxed text-slate-200">
            {data.briefingText}
          </p>

          {/* Convincing Encrypted Dossier Block */}
          <div className="rounded-xl border border-sky-400/20 bg-[#02050e]/90 p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-sky-400/10 pb-3">
              <span className="font-mono text-xs text-slate-400">
                Encrypted Archive Summary
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-sky-300">
                <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Restricted Payload</span>
              </span>
            </div>

            <ul className="mt-4 space-y-3 font-mono text-xs leading-relaxed text-slate-300 sm:text-sm">
              {data.redactedNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-sky-400/75 tabular-nums">0{idx + 1}.</span>
                  <span>{note}</span>
                </li>
              ))}
              <li className="flex flex-wrap items-center gap-3 pt-1 text-slate-500">
                <span className="tabular-nums">0{data.redactedNotes.length + 1}.</span>
                <span className="select-none rounded bg-slate-800/95 px-2.5 py-0.5 text-slate-800">
                  CLASSIFIED COORDINATES SOVEREIGN-ALPHA-7
                </span>
                <span className="text-xs text-slate-400">
                  (Unlocks inside external transmission)
                </span>
              </li>
            </ul>
          </div>

          {/* Clearance Confirmation & Direct Rickroll Launch */}
          <div className="flex flex-col gap-5 border-t border-sky-400/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <label className="inline-flex items-center gap-3 text-sm text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={clearanceChecked}
                onChange={(e) => setClearanceChecked(e.target.checked)}
                className="h-4 w-4 rounded border-sky-400/40 bg-[#071022] accent-sky-400 cursor-pointer"
              />
              <span>I acknowledge non-disclosure of this classified transmission</span>
            </label>

            <a
              href={data.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              className={`inline-flex items-center justify-center gap-2.5 rounded-lg px-6 py-3.5 text-sm font-semibold transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 ${
                clearanceChecked
                  ? 'bg-sky-400 text-slate-950 shadow-[0_0_32px_rgba(56,189,248,0.45)] hover:bg-sky-300'
                  : 'bg-sky-500 text-slate-950 hover:bg-sky-400'
              }`}
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              <span>{data.actionButtonLabel}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
