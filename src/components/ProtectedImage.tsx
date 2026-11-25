import { ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface ProtectedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ProtectedImage({
  src,
  alt,
  className = 'h-full w-full object-cover object-center',
  fallbackLabel,
}: ProtectedImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),rgba(4,9,24,0.96))] p-6 text-center select-none">
        <ImageIcon className="h-10 w-10 text-sky-400/50" aria-hidden="true" />
        {fallbackLabel && (
          <span className="mt-3 font-display text-sm font-medium text-slate-300">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative h-full w-full select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        className={`pointer-events-none select-none ${className}`}
      />
      {/* Transparent shield overlay prevents direct image drag/save-as */}
      <div
        aria-hidden="true"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        className="absolute inset-0 z-10 bg-transparent select-none"
      />
    </div>
  );
}
