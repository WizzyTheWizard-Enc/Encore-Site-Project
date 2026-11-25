import { Lock, Plus, RotateCcw, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { DEFAULT_PORTFOLIO, GENERATED_IMAGE_PRESETS } from '../data/defaultPortfolio';
import { AccentPalette, PortfolioData, SectionId } from '../types/portfolio';

interface CustomizeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onLock: () => void;
  data: PortfolioData;
  onChange: (next: PortfolioData) => void;
  onReset: () => void;
  activeSection: SectionId;
}

type EditorTab = 'home' | 'identity' | 'contact' | 'hobbies' | 'empire' | 'secret' | 'visuals';

export function CustomizeDrawer({
  isOpen,
  onClose,
  onLock,
  data,
  onChange,
  onReset,
  activeSection,
}: CustomizeDrawerProps) {
  const [tab, setTab] = useState<EditorTab>(activeSection);

  useEffect(() => {
    if (isOpen) {
      setTab(activeSection);
    }
  }, [isOpen, activeSection]);

  const tabs: Array<{ id: EditorTab; label: string }> = [
    { id: 'home', label: 'Home' },
    { id: 'identity', label: 'Emperor Profile' },
    { id: 'contact', label: 'Contact' },
    { id: 'hobbies', label: 'Hobbies' },
    { id: 'empire', label: 'Empire' },
    { id: 'secret', label: 'Top Secret' },
    { id: 'visuals', label: 'Space & Blue' },
  ];

  const inputClass =
    'w-full rounded-lg border border-sky-400/20 bg-[#040918] px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:outline-none';
  const labelClass = 'block text-xs font-medium text-slate-300 mb-1.5';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm"
          />

          {/* Slide-over Verified Emperor Editor */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Emperor Editor"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col border-l border-sky-400/20 bg-[#050b1a] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-sky-400/15 px-6 py-4">
              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  Emperor Control Console
                </h2>
                <p className="text-xs text-slate-400">
                  Verified session · Changes to profile, portrait, and links save automatically.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close customize drawer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-sky-400/20 text-slate-300 transition-colors hover:bg-sky-500/10 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Section Tabs */}
            <div className="flex gap-1.5 overflow-x-auto border-b border-sky-400/15 px-6 py-3">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    tab === t.id
                      ? 'bg-sky-500 text-slate-950'
                      : 'bg-sky-950/40 text-slate-300 hover:bg-sky-900/50 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
              {tab === 'home' && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Navigation Brand Title</label>
                    <input
                      type="text"
                      value={data.brandTitle}
                      onChange={(e) => onChange({ ...data, brandTitle: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Proclamation Kicker</label>
                    <input
                      type="text"
                      value={data.home.kicker}
                      onChange={(e) =>
                        onChange({ ...data, home: { ...data.home, kicker: e.target.value } })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Hero Headline</label>
                    <textarea
                      rows={2}
                      value={data.home.headline}
                      onChange={(e) =>
                        onChange({ ...data, home: { ...data.home, headline: e.target.value } })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Advertisement Summary</label>
                    <textarea
                      rows={3}
                      value={data.home.summary}
                      onChange={(e) =>
                        onChange({ ...data, home: { ...data.home, summary: e.target.value } })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Primary CTA Label</label>
                      <input
                        type="text"
                        value={data.home.ctaLabel}
                        onChange={(e) =>
                          onChange({ ...data, home: { ...data.home, ctaLabel: e.target.value } })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Secondary CTA Label</label>
                      <input
                        type="text"
                        value={data.home.secondaryLabel}
                        onChange={(e) =>
                          onChange({
                            ...data,
                            home: { ...data.home, secondaryLabel: e.target.value },
                          })
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="border-t border-sky-400/15 pt-4">
                    <span className="mb-3 block text-xs font-semibold text-slate-200">
                      Propaganda Slides ({data.home.propaganda.length})
                    </span>
                    <div className="space-y-3">
                      {data.home.propaganda.map((slide, idx) => (
                        <div
                          key={slide.id}
                          className="space-y-2.5 rounded-xl border border-sky-400/15 bg-[#040814] p-3.5"
                        >
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => {
                              const next = [...data.home.propaganda];
                              next[idx] = { ...slide, title: e.target.value };
                              onChange({ ...data, home: { ...data.home, propaganda: next } });
                            }}
                            placeholder="Propaganda title"
                            className={inputClass}
                          />
                          <textarea
                            rows={2}
                            value={slide.promise}
                            onChange={(e) => {
                              const next = [...data.home.propaganda];
                              next[idx] = { ...slide, promise: e.target.value };
                              onChange({ ...data, home: { ...data.home, propaganda: next } });
                            }}
                            placeholder="Imperial promise"
                            className={inputClass}
                          />
                          <select
                            value={
                              GENERATED_IMAGE_PRESETS.some((p) => p.url === slide.imageUrl)
                                ? slide.imageUrl
                                : 'custom'
                            }
                            onChange={(e) => {
                              if (e.target.value === 'custom') return;
                              const next = [...data.home.propaganda];
                              next[idx] = { ...slide, imageUrl: e.target.value };
                              onChange({ ...data, home: { ...data.home, propaganda: next } });
                            }}
                            className={inputClass}
                          >
                            {GENERATED_IMAGE_PRESETS.map((preset) => (
                              <option key={preset.url} value={preset.url}>
                                {preset.label}
                              </option>
                            ))}
                            <option value="custom">Custom Image URL</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === 'identity' && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Imperial Title</label>
                    <input
                      type="text"
                      value={data.identity.imperialTitle}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          identity: { ...data.identity, imperialTitle: e.target.value },
                        })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input
                      type="text"
                      value={data.identity.fullName}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          identity: { ...data.identity, fullName: e.target.value },
                        })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>NIT</label>
                      <input
                        type="text"
                        value={data.identity.nit}
                        onChange={(e) =>
                          onChange({
                            ...data,
                            identity: { ...data.identity, nit: e.target.value },
                          })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Class &amp; Major</label>
                      <input
                        type="text"
                        value={data.identity.classMajor}
                        onChange={(e) =>
                          onChange({
                            ...data,
                            identity: { ...data.identity, classMajor: e.target.value },
                          })
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Emperor Portrait Image URL</label>
                    <select
                      value={
                        GENERATED_IMAGE_PRESETS.some(
                          (p) => p.url === data.identity.profileImageUrl
                        )
                          ? data.identity.profileImageUrl
                          : 'custom'
                      }
                      onChange={(e) => {
                        if (e.target.value === 'custom') return;
                        onChange({
                          ...data,
                          identity: { ...data.identity, profileImageUrl: e.target.value },
                        });
                      }}
                      className={`${inputClass} mb-2`}
                    >
                      {GENERATED_IMAGE_PRESETS.map((preset) => (
                        <option key={preset.url} value={preset.url}>
                          {preset.label}
                        </option>
                      ))}
                      <option value="custom">Custom Image URL</option>
                    </select>
                    <input
                      type="text"
                      value={data.identity.profileImageUrl}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          identity: { ...data.identity, profileImageUrl: e.target.value },
                        })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Emperor Autobiography</label>
                    <textarea
                      rows={4}
                      value={data.identity.biography}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          identity: { ...data.identity, biography: e.target.value },
                        })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="border-t border-sky-400/15 pt-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200">
                        Profile Record Fields
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onChange({
                            ...data,
                            identity: {
                              ...data.identity,
                              extraFields: [
                                ...data.identity.extraFields,
                                {
                                  id: `field-${Date.now()}`,
                                  label: 'New Attribute',
                                  value: 'Custom detail',
                                },
                              ],
                            },
                          })
                        }
                        className="inline-flex items-center gap-1 rounded-md bg-sky-500/15 px-2.5 py-1 text-xs font-medium text-sky-300 hover:bg-sky-500/25 cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add Field</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {data.identity.extraFields.map((field, idx) => (
                        <div
                          key={field.id}
                          className="space-y-2.5 rounded-xl border border-sky-400/15 bg-[#040814] p-3.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) => {
                                const next = [...data.identity.extraFields];
                                next[idx] = { ...field, label: e.target.value };
                                onChange({
                                  ...data,
                                  identity: { ...data.identity, extraFields: next },
                                });
                              }}
                              placeholder="Field label"
                              className={inputClass}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const next = data.identity.extraFields.filter(
                                  (f) => f.id !== field.id
                                );
                                onChange({
                                  ...data,
                                  identity: { ...data.identity, extraFields: next },
                                });
                              }}
                              aria-label="Delete field"
                              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rose-400/20 text-rose-300 hover:bg-rose-500/10 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) => {
                              const next = [...data.identity.extraFields];
                              next[idx] = { ...field, value: e.target.value };
                              onChange({
                                ...data,
                                identity: { ...data.identity, extraFields: next },
                              });
                            }}
                            placeholder="Field value"
                            className={inputClass}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === 'contact' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">
                      Contact Channels ({data.contact.entries.length})
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onChange({
                          ...data,
                          contact: {
                            ...data.contact,
                            entries: [
                              ...data.contact.entries,
                              {
                                id: `c-${Date.now()}`,
                                kind: 'custom',
                                label: 'Website / Link',
                                displayValue: 'wisnu.space',
                                href: 'https://',
                                note: 'Additional contact channel',
                              },
                            ],
                          },
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-md bg-sky-500/15 px-2.5 py-1 text-xs font-medium text-sky-300 hover:bg-sky-500/25 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Contact</span>
                    </button>
                  </div>

                  {data.contact.entries.map((entry, idx) => (
                    <div
                      key={entry.id}
                      className="space-y-3 rounded-xl border border-sky-400/15 bg-[#040814] p-4"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={entry.label}
                          onChange={(e) => {
                            const next = [...data.contact.entries];
                            next[idx] = { ...entry, label: e.target.value };
                            onChange({ ...data, contact: { ...data.contact, entries: next } });
                          }}
                          placeholder="Label (e.g., Instagram)"
                          className={inputClass}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const next = data.contact.entries.filter((c) => c.id !== entry.id);
                            onChange({ ...data, contact: { ...data.contact, entries: next } });
                          }}
                          aria-label={`Delete ${entry.label}`}
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rose-400/20 text-rose-300 hover:bg-rose-500/10 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={entry.displayValue}
                        onChange={(e) => {
                          const next = [...data.contact.entries];
                          next[idx] = { ...entry, displayValue: e.target.value };
                          onChange({ ...data, contact: { ...data.contact, entries: next } });
                        }}
                        placeholder="Displayed handle or number"
                        className={inputClass}
                      />
                      <input
                        type="text"
                        value={entry.href}
                        onChange={(e) => {
                          const next = [...data.contact.entries];
                          next[idx] = { ...entry, href: e.target.value };
                          onChange({ ...data, contact: { ...data.contact, entries: next } });
                        }}
                        placeholder="Link URL (tel:, mailto:, https://...)"
                        className={inputClass}
                      />
                      <input
                        type="text"
                        value={entry.note}
                        onChange={(e) => {
                          const next = [...data.contact.entries];
                          next[idx] = { ...entry, note: e.target.value };
                          onChange({ ...data, contact: { ...data.contact, entries: next } });
                        }}
                        placeholder="Short description"
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>
              )}

              {tab === 'hobbies' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">
                      Hobby Cards ({data.hobbies.items.length})
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onChange({
                          ...data,
                          hobbies: {
                            ...data.hobbies,
                            items: [
                              ...data.hobbies.items,
                              {
                                id: `h-${Date.now()}`,
                                title: 'New Hobby',
                                subtitle: 'Category · Focus',
                                description: 'Describe what you enjoy doing in your free time.',
                                imageUrl: GENERATED_IMAGE_PRESETS[3].url,
                                highlights: ['Interest 1', 'Interest 2'],
                              },
                            ],
                          },
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-md bg-sky-500/15 px-2.5 py-1 text-xs font-medium text-sky-300 hover:bg-sky-500/25 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Hobby</span>
                    </button>
                  </div>

                  {data.hobbies.items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="space-y-3 rounded-xl border border-sky-400/15 bg-[#040814] p-4"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const next = [...data.hobbies.items];
                            next[idx] = { ...item, title: e.target.value };
                            onChange({ ...data, hobbies: { ...data.hobbies, items: next } });
                          }}
                          placeholder="Hobby title"
                          className={inputClass}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const next = data.hobbies.items.filter((h) => h.id !== item.id);
                            onChange({ ...data, hobbies: { ...data.hobbies, items: next } });
                          }}
                          aria-label={`Delete ${item.title}`}
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rose-400/20 text-rose-300 hover:bg-rose-500/10 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={item.subtitle}
                        onChange={(e) => {
                          const next = [...data.hobbies.items];
                          next[idx] = { ...item, subtitle: e.target.value };
                          onChange({ ...data, hobbies: { ...data.hobbies, items: next } });
                        }}
                        placeholder="Subtitle"
                        className={inputClass}
                      />
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const next = [...data.hobbies.items];
                          next[idx] = { ...item, description: e.target.value };
                          onChange({ ...data, hobbies: { ...data.hobbies, items: next } });
                        }}
                        placeholder="Description"
                        className={inputClass}
                      />
                      <div>
                        <label className={labelClass}>Image Preset or Custom URL</label>
                        <select
                          value={
                            GENERATED_IMAGE_PRESETS.some((p) => p.url === item.imageUrl)
                              ? item.imageUrl
                              : 'custom'
                          }
                          onChange={(e) => {
                            if (e.target.value === 'custom') return;
                            const next = [...data.hobbies.items];
                            next[idx] = { ...item, imageUrl: e.target.value };
                            onChange({ ...data, hobbies: { ...data.hobbies, items: next } });
                          }}
                          className={`${inputClass} mb-2`}
                        >
                          {GENERATED_IMAGE_PRESETS.map((preset) => (
                            <option key={preset.url} value={preset.url}>
                              {preset.label}
                            </option>
                          ))}
                          <option value="custom">Custom Image URL</option>
                        </select>
                        <input
                          type="text"
                          value={item.imageUrl}
                          onChange={(e) => {
                            const next = [...data.hobbies.items];
                            next[idx] = { ...item, imageUrl: e.target.value };
                            onChange({ ...data, hobbies: { ...data.hobbies, items: next } });
                          }}
                          placeholder="Image URL"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'empire' && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Future Project Manifesto</label>
                    <textarea
                      rows={4}
                      value={data.empire.manifesto}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          empire: { ...data.empire, manifesto: e.target.value },
                        })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="border-t border-sky-400/15 pt-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200">
                        Strategic Phases ({data.empire.pillars.length})
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onChange({
                            ...data,
                            empire: {
                              ...data.empire,
                              pillars: [
                                ...data.empire.pillars,
                                {
                                  id: `e-${Date.now()}`,
                                  code: `Phase 0${data.empire.pillars.length + 1}`,
                                  title: 'New Expansion Pillar',
                                  summary: 'Strategic objective for galactic rule and wealth.',
                                  targetMetric: 'Sector Dominance',
                                },
                              ],
                            },
                          })
                        }
                        className="inline-flex items-center gap-1 rounded-md bg-sky-500/15 px-2.5 py-1 text-xs font-medium text-sky-300 hover:bg-sky-500/25 cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add Phase</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {data.empire.pillars.map((pillar, idx) => (
                        <div
                          key={pillar.id}
                          className="space-y-2.5 rounded-xl border border-sky-400/15 bg-[#040814] p-4"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={pillar.title}
                              onChange={(e) => {
                                const next = [...data.empire.pillars];
                                next[idx] = { ...pillar, title: e.target.value };
                                onChange({
                                  ...data,
                                  empire: { ...data.empire, pillars: next },
                                });
                              }}
                              className={inputClass}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const next = data.empire.pillars.filter((p) => p.id !== pillar.id);
                                onChange({
                                  ...data,
                                  empire: { ...data.empire, pillars: next },
                                });
                              }}
                              aria-label={`Delete ${pillar.title}`}
                              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rose-400/20 text-rose-300 hover:bg-rose-500/10 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <textarea
                            rows={2}
                            value={pillar.summary}
                            onChange={(e) => {
                              const next = [...data.empire.pillars];
                              next[idx] = { ...pillar, summary: e.target.value };
                              onChange({ ...data, empire: { ...data.empire, pillars: next } });
                            }}
                            className={inputClass}
                          />
                          <input
                            type="text"
                            value={pillar.targetMetric}
                            onChange={(e) => {
                              const next = [...data.empire.pillars];
                              next[idx] = { ...pillar, targetMetric: e.target.value };
                              onChange({ ...data, empire: { ...data.empire, pillars: next } });
                            }}
                            placeholder="Target outcome"
                            className={inputClass}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === 'secret' && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Menu Button Label</label>
                    <input
                      type="text"
                      value={data.secret.menuLabel}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          secret: { ...data.secret, menuLabel: e.target.value },
                        })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Vault Headline</label>
                    <input
                      type="text"
                      value={data.secret.sectionTitle}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          secret: { ...data.secret, sectionTitle: e.target.value },
                        })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Secrecy Briefing Text</label>
                    <textarea
                      rows={3}
                      value={data.secret.briefingText}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          secret: { ...data.secret, briefingText: e.target.value },
                        })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Action Button Label</label>
                    <input
                      type="text"
                      value={data.secret.actionButtonLabel}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          secret: { ...data.secret, actionButtonLabel: e.target.value },
                        })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Destination Video URL (Rickroll)</label>
                    <input
                      type="url"
                      value={data.secret.targetUrl}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          secret: { ...data.secret, targetUrl: e.target.value },
                        })
                      }
                      className={inputClass}
                    />
                  </div>
                  <label className="flex items-start gap-3 rounded-xl border border-sky-400/15 bg-[#040814] p-4 text-sm text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.secret.directMenuRedirect}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          secret: { ...data.secret, directMenuRedirect: e.target.checked },
                        })
                      }
                      className="mt-0.5 h-4 w-4 rounded border-sky-400/40 accent-sky-400"
                    />
                    <span>
                      <strong className="block font-medium text-white">
                        Redirect immediately from top menu link
                      </strong>
                      <span className="mt-0.5 block text-xs text-slate-400">
                        Off: opens the convincing Classified Vault page first before Rickrolling on click. On: clicking &ldquo;{data.secret.menuLabel}&rdquo; in the top bar opens YouTube immediately.
                      </span>
                    </span>
                  </label>
                </div>
              )}

              {tab === 'visuals' && (
                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>Futuristic Blue Accent Tone</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['sapphire', 'cobalt', 'glacial'] as AccentPalette[]).map((tone) => (
                        <button
                          key={tone}
                          type="button"
                          onClick={() =>
                            onChange({ ...data, visuals: { ...data.visuals, accent: tone } })
                          }
                          className={`rounded-lg border px-3 py-2 text-xs font-medium capitalize transition-colors cursor-pointer ${
                            data.visuals.accent === tone
                              ? 'border-sky-400 bg-sky-500/20 text-white'
                              : 'border-sky-400/15 bg-[#040814] text-slate-300 hover:border-sky-400/35'
                          }`}
                        >
                          {tone}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Starfield Density ({data.visuals.starDensity === 1 ? 'Minimal' : data.visuals.starDensity === 2 ? 'Balanced HD' : 'Dense Cosmos'})
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={1}
                      value={data.visuals.starDensity}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          visuals: { ...data.visuals, starDensity: Number(e.target.value) },
                        })
                      }
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Star Drift Speed ({data.visuals.starSpeed.toFixed(1)}x)
                    </label>
                    <input
                      type="range"
                      min={0.5}
                      max={2.5}
                      step={0.25}
                      value={data.visuals.starSpeed}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          visuals: { ...data.visuals, starSpeed: Number(e.target.value) },
                        })
                      }
                      className="w-full accent-sky-400 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-3 border-t border-sky-400/15 pt-4">
                    <span className="block text-xs font-semibold text-slate-200">
                      Section Background Images
                    </span>
                    {(
                      [
                        { key: 'home', label: 'Home Landing Backdrop' },
                        { key: 'identity', label: 'Emperor Profile Backdrop' },
                        { key: 'contact', label: 'Contact Backdrop' },
                        { key: 'hobbies', label: 'Hobbies Backdrop' },
                        { key: 'empire', label: 'Future Empire Backdrop' },
                        { key: 'secret', label: 'Top Secret Vault Backdrop' },
                      ] as const
                    ).map((item) => (
                      <div key={item.key}>
                        <label className={labelClass}>{item.label}</label>
                        <select
                          value={data[item.key].backdropUrl}
                          onChange={(e) =>
                            onChange({
                              ...data,
                              [item.key]: { ...data[item.key], backdropUrl: e.target.value },
                            })
                          }
                          className={inputClass}
                        >
                          {GENERATED_IMAGE_PRESETS.map((preset) => (
                            <option key={preset.url} value={preset.url}>
                              {preset.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions: Lock Session & Reset Defaults (Downloads Disabled) */}
            <div className="border-t border-sky-400/15 bg-[#030712] px-6 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={onLock}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-sky-400/25 bg-sky-500/10 px-3.5 py-2 text-xs font-medium text-sky-200 transition-colors hover:bg-sky-500/20 cursor-pointer"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Lock Editor</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onReset();
                    void DEFAULT_PORTFOLIO;
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-rose-400/25 px-3 py-2 text-xs font-medium text-rose-300 transition-colors hover:bg-rose-500/10 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset Defaults</span>
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
