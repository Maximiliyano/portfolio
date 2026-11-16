import React from 'react';
import { motion } from 'framer-motion';
import { aiCapabilities } from '../../data/ai';
import { CollapsibleSection } from '../layout/CollapsibleSection';
import { EASE_IN_OUT } from '../../lib/motion';

type Props = { onOpenProject: (id: string) => void };

export const AiStackSection: React.FC<Props> = ({ onOpenProject }) => (
    <CollapsibleSection id="ai" reveal={false} title="Working with AI">
        <div className="grid gap-x-12 gap-y-9 sm:grid-cols-2 pb-2">
            {aiCapabilities.map((c, i) => (
                <motion.article
                    key={c.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: EASE_IN_OUT }}
                    className="border-t border-[var(--border-strong)] pt-4"
                >
                    <h3 className="font-display text-lg font-semibold leading-tight">{c.title}</h3>
                    <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{c.blurb}</p>
                    <p className="mt-3 text-sm leading-relaxed">{c.evidence}</p>
                    <p className="mt-3 text-xs text-[var(--muted)]">{c.tags.join(' · ')}</p>
                    {c.projectId && (
                        <button
                            type="button"
                            onClick={() => onOpenProject(c.projectId!)}
                            className="mt-3 text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded"
                        >
                            Read about the project
                        </button>
                    )}
                </motion.article>
            ))}
        </div>
    </CollapsibleSection>
);
