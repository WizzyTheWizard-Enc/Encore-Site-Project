import { ShieldAlert } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { CustomizeDrawer } from './components/CustomizeDrawer';
import { ImperialFlameCanvas } from './components/ImperialFlameCanvas';
import { Navbar } from './components/Navbar';
import { PasswordGateModal } from './components/PasswordGateModal';
import { SectionBackdrop } from './components/SectionBackdrop';
import { StarfieldCanvas } from './components/StarfieldCanvas';
import { ContactSection } from './components/sections/ContactSection';
import { EmpireSection } from './components/sections/EmpireSection';
import { HobbiesSection } from './components/sections/HobbiesSection';
import { HomeLanding } from './components/sections/HomeLanding';
import { IdentitySection } from './components/sections/IdentitySection';
import { TopSecretSection } from './components/sections/TopSecretSection';
import { DEFAULT_PORTFOLIO } from './data/defaultPortfolio';
import { PortfolioData, SectionId } from './types/portfolio';

const STORAGE_KEY = 'wisnu_stellar_portfolio_v2';
const IMPERIAL_EDIT_PASSWORD = 'Encore2808';

function loadSavedPortfolio(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PORTFOLIO;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PORTFOLIO,
      ...parsed,
      home: { ...DEFAULT_PORTFOLIO.home, ...(parsed.home ?? {}) },
      identity: { ...DEFAULT_PORTFOLIO.identity, ...(parsed.identity ?? {}) },
      contact: { ...DEFAULT_PORTFOLIO.contact, ...(parsed.contact ?? {}) },
      hobbies: { ...DEFAULT_PORTFOLIO.hobbies, ...(parsed.hobbies ?? {}) },
      empire: { ...DEFAULT_PORTFOLIO.empire, ...(parsed.empire ?? {}) },
      secret: { ...DEFAULT_PORTFOLIO.secret, ...(parsed.secret ?? {}) },
      visuals: { ...DEFAULT_PORTFOLIO.visuals, ...(parsed.visuals ?? {}) },
    };
  } catch {
    return DEFAULT_PORTFOLIO;
  }
}

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData>(loadSavedPortfolio);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [hoverBackdropUrl, setHoverBackdropUrl] = useState<string | null>(null);
  const [isEditUnlocked, setIsEditUnlocked] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [securityCurtainActive, setSecurityCurtainActive] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
    } catch {
      // Ignore storage quota errors
    }
  }, [portfolio]);

  // Global Anti-Download, Anti-Drag, and Anti-Screenshot Shield
  useEffect(() => {
    let curtainTimer: number | undefined;

    const triggerSecurityCurtain = () => {
      setSecurityCurtainActive(true);
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText('Protected Imperial Asset — Capture Restricted').catch(() => {});
      }
      window.clearTimeout(curtainTimer);
      curtainTimer = window.setTimeout(() => setSecurityCurtainActive(false), 2400);
    };

    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isEditableField =
        isEditUnlocked &&
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');
      if (!isEditableField) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const isMod = e.ctrlKey || e.metaKey;

      // Screenshot / screen-capture keys
      if (
        e.key === 'PrintScreen' ||
        (isMod && e.shiftKey && (key === 's' || key === '3' || key === '4' || key === '5'))
      ) {
        e.preventDefault();
        triggerSecurityCurtain();
        return;
      }

      // Disable Save, Print, View Source, DevTools inspection shortcuts
      if (
        (isMod && (key === 's' || key === 'p' || key === 'u')) ||
        (isMod && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.clearTimeout(curtainTimer);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isEditUnlocked]);

  const handleSelectSection = (section: SectionId) => {
    setHoverBackdropUrl(null);
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestEdit = () => {
    if (isEditUnlocked) {
      setIsCustomizeOpen(true);
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  const handleUnlockSuccess = () => {
    setIsEditUnlocked(true);
    setIsPasswordModalOpen(false);
    setIsCustomizeOpen(true);
  };

  const handleLockEditor = () => {
    setIsCustomizeOpen(false);
    setIsEditUnlocked(false);
  };

  const handleReset = () => {
    if (!isEditUnlocked) return;
    setPortfolio(DEFAULT_PORTFOLIO);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const currentBackdropUrl =
    hoverBackdropUrl ?? portfolio[activeSection].backdropUrl;

  return (
    <div
      onContextMenu={(e) => {
        if (!isEditUnlocked) e.preventDefault();
      }}
      className="relative min-h-screen bg-[#030712] text-slate-100 flex flex-col"
    >
      {/* HD Starry Sky Canvas */}
      <StarfieldCanvas
        activeSection={activeSection}
        accent={portfolio.visuals.accent}
        density={portfolio.visuals.starDensity}
        speed={portfolio.visuals.starSpeed}
      />

      {/* Fiery Warhammer-Inspired Ember & Flame Canvas on Emperor Profile */}
      {activeSection === 'identity' && <ImperialFlameCanvas />}

      {/* Section-Specific HD Photographic / Cosmic Backdrop */}
      <SectionBackdrop
        activeSection={activeSection}
        imageUrl={currentBackdropUrl}
      />

      {/* 3-Zone Top Bar */}
      <Navbar
        brandTitle={portfolio.brandTitle}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenCustomize={handleRequestEdit}
        isEditUnlocked={isEditUnlocked}
        secretLabel={portfolio.secret.menuLabel}
        secretDirectRedirect={portfolio.secret.directMenuRedirect}
        secretUrl={portfolio.secret.targetUrl}
        accent={portfolio.visuals.accent}
      />

      {/* Main Content Stage with Futuristic Transitions */}
      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeSection === 'home' && (
              <HomeLanding
                data={portfolio}
                onNavigate={handleSelectSection}
                accent={portfolio.visuals.accent}
              />
            )}
            {activeSection === 'identity' && (
              <IdentitySection
                data={portfolio.identity}
                accent={portfolio.visuals.accent}
                onNavigate={handleSelectSection}
                onOpenEditor={handleRequestEdit}
              />
            )}
            {activeSection === 'contact' && (
              <ContactSection
                data={portfolio.contact}
                accent={portfolio.visuals.accent}
                onOpenEditor={handleRequestEdit}
              />
            )}
            {activeSection === 'hobbies' && (
              <HobbiesSection
                data={portfolio.hobbies}
                accent={portfolio.visuals.accent}
                onHoverBackdropChange={setHoverBackdropUrl}
                onOpenEditor={handleRequestEdit}
              />
            )}
            {activeSection === 'empire' && (
              <EmpireSection
                data={portfolio.empire}
                accent={portfolio.visuals.accent}
                onOpenEditor={handleRequestEdit}
              />
            )}
            {activeSection === 'secret' && (
              <TopSecretSection data={portfolio.secret} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="relative z-10 border-t border-sky-400/10 bg-[#030712]/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 text-xs text-slate-400 sm:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-slate-300">{portfolio.identity.fullName}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">NIT {portfolio.identity.nit}</span>
            <span aria-hidden="true">·</span>
            <span>{portfolio.identity.classMajor}</span>
          </div>

          <button
            type="button"
            onClick={() => handleSelectSection('home')}
            className="text-slate-400 transition-colors hover:text-sky-300 cursor-pointer"
          >
            Return to Home
          </button>
        </div>
      </footer>

      {/* Password Gate Modal ("Encore2808") */}
      <PasswordGateModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onUnlock={handleUnlockSuccess}
        expectedPassword={IMPERIAL_EDIT_PASSWORD}
      />

      {/* Verified Emperor Editor Drawer */}
      <CustomizeDrawer
        isOpen={isCustomizeOpen && isEditUnlocked}
        onClose={() => setIsCustomizeOpen(false)}
        onLock={handleLockEditor}
        data={portfolio}
        onChange={setPortfolio}
        onReset={handleReset}
        activeSection={activeSection}
      />

      {/* Anti-Screenshot Privacy Curtain */}
      <AnimatePresence>
        {securityCurtainActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#02050d]/96 p-6 text-center backdrop-blur-2xl"
          >
            <ShieldAlert className="h-12 w-12 text-sky-400" aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl font-semibold text-white">
              Imperial Capture Shield Active
            </h2>
            <p className="mt-2 max-w-md text-sm text-slate-300">
              Downloading, screen capturing, and unauthorized copying of the Emperor’s profile, portrait, and links are disabled.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
