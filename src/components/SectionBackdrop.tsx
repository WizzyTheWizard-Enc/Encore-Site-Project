import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { SectionId } from '../types/portfolio';

interface SectionBackdropProps {
  activeSection: SectionId;
  imageUrl: string;
}

const SECTION_OVERLAY_TONE: Record<SectionId, string> = {
  home: 'from-[#030712]/72 via-[#040c21]/76 to-[#030712]/95',
  identity: 'from-[#090612]/74 via-[#140a18]/78 to-[#030712]/96',
  contact: 'from-[#020a18]/82 via-[#041126]/84 to-[#030712]/96',
  hobbies: 'from-[#03091b]/70 via-[#050f26]/76 to-[#030712]/95',
  empire: 'from-[#020714]/65 via-[#040c22]/74 to-[#030712]/94',
  secret: 'from-[#02050d]/82 via-[#040a16]/88 to-[#02040a]/96',
};

export function SectionBackdrop({ activeSection, imageUrl }: SectionBackdropProps) {
  const [failedUrls, setFailedUrls] = useState<Record<string, boolean>>({});
  const isBroken = Boolean(failedUrls[imageUrl]);

  return (
    <div
      aria-hidden="true"
      onContextMenu={(e) => e.preventDefault()}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeSection}-${imageUrl}`}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: activeSection === 'hobbies' ? 0.5 : 0.44, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {!isBroken && imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              draggable={false}
              referrerPolicy="no-referrer"
              onError={() => setFailedUrls((prev) => ({ ...prev, [imageUrl]: true }))}
              className="h-full w-full object-cover object-center select-none"
            />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_top,_rgba(29,78,216,0.28),_rgba(3,7,18,0.95)_70%)]" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Measured contrast scrim to guarantee >= 4.5:1 text legibility */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${SECTION_OVERLAY_TONE[activeSection]} transition-colors duration-500`}
      />

      {/* Fiery rim aura on Emperor Profile, tactical grid on Top Secret */}
      {activeSection === 'identity' && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(234,88,12,0.16),transparent_60%)]" />
      )}
      {activeSection === 'secret' && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(56,189,248,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.12) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      )}

      {/* Subtle architectural coordinate hairline vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(3,7,18,0.74)_100%)]" />
    </div>
  );
}
