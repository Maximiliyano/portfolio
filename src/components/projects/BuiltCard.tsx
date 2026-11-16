import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink, FiCheck, FiCircle, FiClock } from 'react-icons/fi';
import type { PersonalProject } from '../../data/personalProjects';
import { EASE_IN_OUT } from '../../lib/motion';

const STATUS_LABEL: Record<PersonalProject['status'], string> = {
    live: 'Live',
    demo: 'Demo',
    wip: 'In progress',
    planned: 'Planned',
};

const STATUS_COLOR: Record<PersonalProject['status'], string> = {
    live: 'text-emerald-700 dark:text-emerald-400',
    demo: 'text-amber-700 dark:text-amber-300',
    wip: 'text-amber-700 dark:text-amber-300',
    planned: 'text-[var(--accent-2)]',
};

const hostOf = (p: PersonalProject) => {
    const url = p.liveUrl;
    if (!url) return p.status === 'planned' ? 'not public yet' : 'github.com';
    try {
        return new URL(url).host;
    } catch {
        return url;
    }
};

const Placeholder = ({ project }: { project: PersonalProject }) => (
    <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center p-4"
        style={{ backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 14px, var(--grid-line) 14px 15px)' }}
    >
        <span className="font-display text-base font-semibold">{project.title}</span>
        <span className="text-xs text-[var(--muted)]">{project.status === 'planned' ? 'Screenshots once it is built' : 'No screenshot yet'}</span>
    </div>
);

type Props = { project: PersonalProject; index: number };

export const BuiltCard: React.FC<Props> = ({ project: p, index }) => {
    const [imgFailed, setImgFailed] = useState(false);
    const showImage = p.image && !imgFailed;

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: index * 0.07, ease: EASE_IN_OUT }}
            className={`${p.featured ? 'sm:col-span-2 lg:col-span-6 featured-frame lg:flex-row' : 'lg:col-span-2 glass glass-hover lift-hover rounded-2xl'} overflow-hidden flex flex-col`}
        >
            <div className={`p-3 ${p.featured ? 'lg:w-[48%] lg:shrink-0' : ''}`}>
                <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--glass-strong)]">
                    <div className="px-3 py-1.5 border-b border-[var(--border)] bg-[var(--glass)] text-xs text-[var(--muted)] truncate">
                        {hostOf(p)}
                    </div>
                    <div className="relative aspect-[16/10]">
                        {showImage ? (
                            <img
                                src={p.image}
                                alt={`${p.title} screenshot`}
                                loading="lazy"
                                width={1440}
                                height={900}
                                onError={() => setImgFailed(true)}
                                className="absolute inset-0 w-full h-full object-cover object-top"
                            />
                        ) : (
                            <Placeholder project={p} />
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-1 p-5 pt-3 lg:pt-5 flex flex-col">
                <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                    <span className={`text-xs font-medium ${STATUS_COLOR[p.status]}`}>{STATUS_LABEL[p.status]}</span>
                </div>
                <p className="mt-1 text-sm text-[var(--accent)]">{p.tagline}</p>
                <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">{p.description}</p>

                {p.highlights && (
                    <ul className="mt-3 space-y-1.5">
                        {p.highlights.map(h => (
                            <li key={h} className="flex items-start gap-2 text-sm">
                                {p.status === 'planned'
                                    ? <FiCircle size={13} className="mt-1 shrink-0 text-[var(--accent-2)]" aria-hidden="true" />
                                    : <FiCheck size={15} className="mt-0.5 shrink-0 text-[var(--accent-3)]" aria-hidden="true" />}
                                <span>{h}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map(t => <span key={t} className="chip">{t}</span>)}
                </div>

                <div className="mt-auto pt-5 flex flex-wrap gap-3">
                    {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                            Live site <FiExternalLink size={15} />
                        </a>
                    )}
                    {p.repoUrl && (
                        <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                            <FaGithub size={15} /> Source
                        </a>
                    )}
                    {!p.liveUrl && !p.repoUrl && (
                        <span className="inline-flex items-center gap-2 text-xs text-[var(--muted)] border border-dashed border-[var(--border-strong)] rounded-lg px-3 py-2">
                            <FiClock size={13} aria-hidden="true" /> Not public yet
                        </span>
                    )}
                </div>
            </div>
        </motion.article>
    );
};

export default BuiltCard;
