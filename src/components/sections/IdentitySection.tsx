import { ArrowRight, Crown, Flame, Pencil, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { AccentPalette, PortfolioData, SectionId } from '../../types/portfolio';
import { ProtectedImage } from '../ProtectedImage';

interface IdentitySectionProps {
  data: PortfolioData['identity'];
  accent: AccentPalette;
  onNavigate: (section: SectionId) => void;
  onOpenEditor: () => void;
}

const ACCENT_LINK: Record<AccentPalette, string> = {
  sapphire: 'text-sky-300 hover:text-sky-200',
  cobalt: 'text-blue-300 hover:text-blue-200',
  glacial: 'text-cyan-300 hover:text-cyan-200',
};

export function IdentitySection({
  data,
  accent,
  onNavigate,
  onOpenEditor,
}: IdentitySectionProps) {
  const [weaponsIgnited, setWeaponsIgnited] = useState(false);

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-end justify-between gap-6 border-b border-orange-400/20 pb-8"
      >
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-orange-300">
            <Flame className="h-4 w-4 text-orange-400" aria-hidden="true" />
            <span>Imperial Chronicle · Throne Sector</span>
          </div>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {data.sectionTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
            {data.sectionSubtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenEditor}
          className="inline-flex items-center gap-2 rounded-lg border border-orange-400/25 bg-[#120b0c]/75 px-4 py-2 text-xs font-medium text-orange-100 transition-colors hover:border-orange-300/50 hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Edit Emperor Profile</span>
        </button>
      </motion.div>

      {/* Warhammer 40K-Inspired Fiery Sword & Blaster Imperial Introduction Crest */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setWeaponsIgnited(true)}
        onMouseLeave={() => setWeaponsIgnited(false)}
        onClick={() => setWeaponsIgnited((prev) => !prev)}
        className="relative mt-8 overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-r from-[#120709]/90 via-[#0a0f21]/92 to-[#071126]/90 p-6 backdrop-blur-xl sm:p-8 cursor-pointer"
      >
        {/* Animated Flame Rim Sweep */}
        <motion.div
          aria-hidden="true"
          animate={{
            opacity: weaponsIgnited ? [0.45, 0.85, 0.45] : [0.22, 0.38, 0.22],
          }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,88,12,0.22),rgba(56,189,248,0.08)_55%,transparent_80%)]"
        />

        <div className="relative z-10 grid items-center gap-6 lg:grid-cols-12">
          {/* Left: Imperial Chainsword SVG */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center lg:col-span-4"
          >
            <motion.svg
              viewBox="0 0 360 110"
              className="h-24 w-full max-w-[320px] drop-shadow-[0_0_18px_rgba(249,115,22,0.45)]"
              animate={{
                filter: weaponsIgnited
                  ? 'drop-shadow(0 0 24px rgba(251,146,60,0.8))'
                  : 'drop-shadow(0 0 12px rgba(249,115,22,0.4))',
              }}
              aria-label="Imperial Chainsword"
            >
              <defs>
                <linearGradient id="bladeMetal" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="45%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#f8fafc" />
                </linearGradient>
                <linearGradient id="fireEdge" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ea580c" />
                  <stop offset="50%" stopColor="#facc15" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              {/* Pommel & Grip */}
              <circle cx="24" cy="55" r="10" fill="#b45309" stroke="#fcd34d" strokeWidth="1.5" />
              <rect x="32" y="48" width="44" height="14" rx="2" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.2" />
              {/* Crossguard Wing */}
              <path d="M74 26 L94 38 L94 72 L74 84 L82 55 Z" fill="#d97706" stroke="#fde68a" strokeWidth="1.5" />
              {/* Chainsword Casing */}
              <path d="M94 38 L315 38 L345 55 L315 72 L94 72 Z" fill="#0f172a" stroke="#f97316" strokeWidth="1.5" />
              {/* Inner Metallic Housing */}
              <path d="M104 45 L302 45 L322 55 L302 65 L104 65 Z" fill="url(#bladeMetal)" opacity="0.88" />
              {/* Saw Teeth along top & edge */}
              <path
                d="M110 38 L118 29 L126 38 L134 29 L142 38 L150 29 L158 38 L166 29 L174 38 L182 29 L190 38 L198 29 L206 38 L214 29 L222 38 L230 29 L238 38 L246 29 L254 38 L262 29 L270 38 L278 29 L286 38 L294 29 L302 38"
                fill="url(#fireEdge)"
              />
              {/* Heating vents */}
              <circle cx="130" cy="55" r="3" fill="#f97316" />
              <circle cx="150" cy="55" r="3" fill="#f97316" />
              <circle cx="170" cy="55" r="3" fill="#f97316" />
              <line x1="190" y1="55" x2="292" y2="55" stroke="#ef4444" strokeWidth="2.5" />
            </motion.svg>
          </motion.div>

          {/* Center: Imperial Heraldry & Decree */}
          <div className="text-center lg:col-span-4">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/10 text-amber-300">
              <Crown className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mt-3 font-mono text-xs tracking-widest text-amber-300/90">
              IMPERIAL HERALDRY · NIT {data.nit}
            </p>
            <h3 className="mt-1.5 font-display text-xl font-semibold text-white text-balance sm:text-2xl">
              {data.imperialTitle}
            </h3>
            <p className="mt-2 text-xs text-slate-300">
              Sword of Justice · Plasma Blaster of Dominion
            </p>
          </div>

          {/* Right: Heavy Imperial Plasma Blaster SVG */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center lg:col-span-4"
          >
            <motion.svg
              viewBox="0 0 360 110"
              className="h-24 w-full max-w-[320px] drop-shadow-[0_0_18px_rgba(56,189,248,0.45)]"
              animate={{
                filter: weaponsIgnited
                  ? 'drop-shadow(0 0 24px rgba(56,189,248,0.9))'
                  : 'drop-shadow(0 0 12px rgba(56,189,248,0.45))',
              }}
              aria-label="Imperial Plasma Blaster"
            >
              <defs>
                <linearGradient id="plasmaCore" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#e0f2fe" />
                </linearGradient>
              </defs>
              {/* Muzzle Barrel (pointing left toward crest) */}
              <rect x="20" y="34" width="38" height="24" rx="2" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="26" y1="40" x2="26" y2="52" stroke="#38bdf8" strokeWidth="2" />
              {/* Main Bolter/Plasma Chassis */}
              <path d="M58 24 L268 24 L290 42 L290 68 L236 68 L216 74 L74 74 L58 60 Z" fill="#0f172a" stroke="#64748b" strokeWidth="1.6" />
              {/* Glowing Plasma Coils */}
              <rect x="92" y="28" width="124" height="16" rx="4" fill="url(#plasmaCore)" />
              <path d="M104 28 L104 44 M120 28 L120 44 M136 28 L136 44 M152 28 L152 44 M168 28 L168 44 M184 28 L184 44 M200 28 L200 44" stroke="#082f49" strokeWidth="2.5" />
              {/* Imperial Aquila Trim & Magazine */}
              <rect x="138" y="74" width="34" height="26" rx="3" fill="#1e293b" stroke="#d97706" strokeWidth="1.5" />
              {/* Pistol Grip */}
              <path d="M244 68 L272 68 L286 102 L256 102 Z" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
              {/* Sight & Rear Reactor */}
              <rect x="228" y="14" width="36" height="10" rx="2" fill="#334155" stroke="#38bdf8" strokeWidth="1" />
              <circle cx="252" cy="54" r="6" fill="#f97316" stroke="#fde047" strokeWidth="1.2" />
            </motion.svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Emperor Portrait & Autobiography Split */}
      <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-12">
        {/* Emperor Portrait Card (Protected from download/drag) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-orange-400/30 bg-[#080b18]/90 backdrop-blur-md lg:col-span-5"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:h-full lg:min-h-[380px]">
            <ProtectedImage
              src={data.profileImageUrl}
              alt={`${data.fullName} — Imperial Throne Portrait`}
              fallbackLabel={data.fullName}
              className="h-full w-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#060914] via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 p-6">
              <div className="flex items-center gap-2 font-mono text-xs text-amber-300 tabular-nums">
                <span>NIT {data.nit}</span>
                <span aria-hidden="true">·</span>
                <span>{data.classMajor}</span>
              </div>
              <p className="mt-1 font-display text-2xl font-semibold text-white">
                {data.fullName}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tyrant & Sole Emperor Autobiography + Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between rounded-2xl border border-sky-400/20 bg-[#070f21]/85 p-7 backdrop-blur-md sm:p-9 lg:col-span-7"
        >
          <div>
            <div className="flex items-center justify-between gap-4 border-b border-sky-400/15 pb-5">
              <div>
                <span className="font-mono text-xs text-orange-300">
                  Autobiography of the Sole Emperor
                </span>
                <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-white text-balance sm:text-3xl">
                  {data.fullName}
                </h3>
              </div>
              <Shield className="h-6 w-6 shrink-0 text-amber-400/85" aria-hidden="true" />
            </div>

            <p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-[17px]">
              {data.biography}
            </p>

            {/* Primary Mandatory Record Row */}
            <div className="mt-8 grid gap-5 border-t border-sky-400/15 pt-6 sm:grid-cols-2">
              <div>
                <span className="text-xs text-slate-400">Identification Number (NIT)</span>
                <p className="mt-1 font-mono text-2xl font-semibold tracking-tight text-white tabular-nums">
                  {data.nit}
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-400">Class &amp; Major</span>
                <p className="mt-1 font-display text-xl font-semibold tracking-wide text-sky-200">
                  {data.classMajor}
                </p>
              </div>
            </div>

            {/* Extra Imperial & Academic Fields */}
            <dl className="mt-7 grid gap-4 border-t border-sky-400/15 pt-6 sm:grid-cols-2">
              {data.extraFields.map((field) => (
                <div key={field.id}>
                  <dt className="text-xs text-slate-400">{field.label}</dt>
                  <dd
                    className={`mt-1 text-sm font-medium text-slate-100 ${
                      field.mono ? 'font-mono tabular-nums' : ''
                    }`}
                  >
                    {field.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-sky-400/15 pt-6">
            <button
              type="button"
              onClick={() => onNavigate('empire')}
              className={`inline-flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${ACCENT_LINK[accent]}`}
            >
              <span>Inspect Galactic Empire Plan</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white cursor-pointer"
            >
              <span>Proceed to Contact</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
