import { Eye, EyeOff, KeyRound, Lock, ShieldAlert, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FormEvent, useEffect, useRef, useState } from 'react';

interface PasswordGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: () => void;
  expectedPassword: string;
}

export function PasswordGateModal({
  isOpen,
  onClose,
  onUnlock,
  expectedPassword,
}: PasswordGateModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError(null);
      setShowPassword(false);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === expectedPassword) {
      setError(null);
      onUnlock();
      return;
    }
    setError('Identification rejected. Only the Emperor may modify this domain.');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#02050d]/85 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="password-gate-title"
            className="w-full max-w-md overflow-hidden rounded-2xl border border-sky-400/30 bg-[#050c1d] p-6 shadow-[0_0_50px_rgba(14,165,233,0.2)] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-500/10 text-sky-300">
                  <Lock className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-xs text-sky-300/90">
                    Sovereign Edit Protection
                  </p>
                  <h2
                    id="password-gate-title"
                    className="font-display text-xl font-semibold text-white"
                  >
                    Emperor Verification
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close verification dialog"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-sky-400/20 text-slate-300 transition-colors hover:bg-sky-500/10 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              All profile records, portrait assets, and external links are sealed against unauthorized changes. Enter your identification password to unlock editing.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="imperial-password"
                  className="mb-1.5 block text-xs font-medium text-slate-300"
                >
                  Identification Password
                </label>
                <div className="relative">
                  <KeyRound
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400/70"
                    aria-hidden="true"
                  />
                  <input
                    ref={inputRef}
                    id="imperial-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Enter verification password"
                    autoComplete="off"
                    className="w-full rounded-lg border border-sky-400/25 bg-[#030712] py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-2.5 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-slate-400 hover:text-sky-300 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-rose-500/30 bg-rose-950/35 px-3 py-2.5 text-xs text-rose-200">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-sky-400/20 px-4 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-sky-500/10 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-sky-500 px-5 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-sky-400 cursor-pointer"
                >
                  Verify &amp; Unlock
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
