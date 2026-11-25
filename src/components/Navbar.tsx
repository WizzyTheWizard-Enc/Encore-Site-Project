import { Lock, Menu, SlidersHorizontal, Unlock, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { AccentPalette, SectionId } from '../types/portfolio';

interface NavbarProps {
  brandTitle: string;
  activeSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  onOpenCustomize: () => void;
  isEditUnlocked: boolean;
  secretLabel: string;
  secretDirectRedirect: boolean;
  secretUrl: string;
  accent: AccentPalette;
}

const ACCENT_BUTTON_CLASSES: Record<AccentPalette, string> = {
  sapphire: 'bg-sky-500 hover:bg-sky-400 text-slate-950',
  cobalt: 'bg-blue-500 hover:bg-blue-400 text-slate-950',
  glacial: 'bg-cyan-400 hover:bg-cyan-300 text-slate-950',
};

const ACCENT_UNDERLINE_CLASSES: Record<AccentPalette, string> = {
  sapphire: 'bg-sky-400',
  cobalt: 'bg-blue-400',
  glacial: 'bg-cyan-300',
};

export function Navbar({
  brandTitle,
  activeSection,
  onSelectSection,
  onOpenCustomize,
  isEditUnlocked,
  secretLabel,
  secretDirectRedirect,
  secretUrl,
  accent,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: Array<{ id: Exclude<SectionId, 'home'>; label: string }> = [
    { id: 'identity', label: 'Emperor Profile' },
    { id: 'contact', label: 'Contact' },
    { id: 'hobbies', label: 'Hobbies' },
    { id: 'empire', label: 'Galactic Empire' },
    { id: 'secret', label: secretLabel || 'TOP Secret' },
  ];

  const handleNavClick = (id: SectionId) => {
    setMobileOpen(false);
    onSelectSection(id);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-sky-400/15 bg-[#030712]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="font-display text-lg font-semibold tracking-tight text-slate-50 transition-colors hover:text-sky-300 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
        >
          {brandTitle}
        </button>

        {/* Zone 2: 5 Single-Line Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            if (item.id === 'secret' && secretDirectRedirect) {
              return (
                <a
                  key={item.id}
                  href={secretUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                  className="relative py-1.5 text-sm font-medium text-sky-200/85 transition-colors hover:text-sky-300 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
                >
                  {item.label}
                </a>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1.5 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 ${
                  isActive ? 'text-white' : 'text-slate-300/85 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full ${ACCENT_UNDERLINE_CLASSES[accent]}`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCustomize}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold tracking-wide transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 ${ACCENT_BUTTON_CLASSES[accent]}`}
          >
            {isEditUnlocked ? (
              <Unlock className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span>{isEditUnlocked ? 'Edit Site' : 'Emperor Edit'}</span>
            <SlidersHorizontal className="hidden sm:inline h-3.5 w-3.5 opacity-80" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-sky-400/20 text-slate-200 transition-colors hover:bg-sky-500/10 lg:hidden cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Mobile Navigation"
            className="border-t border-sky-400/15 bg-[#040a18]/95 px-4 py-4 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 text-left text-sm font-medium transition-colors ${
                  activeSection === 'home' ? 'bg-sky-500/15 text-sky-200' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>Home</span>
              </button>
              {navItems.map((item) => {
                if (item.id === 'secret' && secretDirectRedirect) {
                  return (
                    <a
                      key={item.id}
                      href={secretUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      onContextMenu={(e) => e.preventDefault()}
                      className="flex min-h-[44px] items-center justify-between rounded-lg px-3 text-sm font-medium text-sky-200 hover:bg-sky-500/10"
                    >
                      <span>{item.label}</span>
                    </a>
                  );
                }
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 text-left text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-sky-500/15 text-sky-200'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
