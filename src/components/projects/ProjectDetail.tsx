import React, { useEffect, useRef, useState } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiUsers } from 'react-icons/fi';
import type { Project } from '../../data/projects';
import { domainById } from '../../data/domains';
import { countryName } from '../../lib/countryFlag';
import { Flag } from '../ui/Flag';
import { formatPeriod } from '../../lib/dateMath';

type Siblings = { prev: Project | null; next: Project | null };

type Props = {
    project: Project | null;
    onClose: () => void;
    onNavigate?: (delta: 1 | -1) => void;
    siblings?: Siblings;
};

const ProjectDetail: React.FC<Props> = ({ project, onClose, onNavigate, siblings }) => {
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const previouslyFocused = useRef<HTMLElement | null>(null);
    const [imageIndex, setImageIndex] = useState(0);

    const imgs = project?.images ?? [];
    const prevImage = () => setImageIndex(i => (i - 1 + imgs.length) % imgs.length);
    const nextImage = () => setImageIndex(i => (i + 1) % imgs.length);

    const canNavigate = Boolean(onNavigate && siblings && (siblings.prev || siblings.next));
    const goPrevProject = () => onNavigate?.(-1);
    const goNextProject = () => onNavigate?.(1);

    useEffect(() => {
        if (!project) return;
        previouslyFocused.current = document.activeElement as HTMLElement | null;
        const dialog = dialogRef.current;
        const focusable = dialog?.querySelectorAll<HTMLElement>('a,button,input,textarea,[tabindex]');
        focusable?.[0]?.focus();

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }
            if (e.key === 'ArrowRight') {
                if (e.shiftKey && canNavigate) {
                    e.preventDefault();
                    goNextProject();
                } else {
                    nextImage();
                }
                return;
            }
            if (e.key === 'ArrowLeft') {
                if (e.shiftKey && canNavigate) {
                    e.preventDefault();
                    goPrevProject();
                } else {
                    prevImage();
                }
                return;
            }
            if (e.key === 'Tab' && dialog) {
                const nodes = Array.from(
                    dialog.querySelectorAll<HTMLElement>('a,button,input,textarea,[tabindex]')
                ).filter(n => !n.hasAttribute('disabled'));
                if (!nodes.length) return;
                const first = nodes[0];
                const last = nodes[nodes.length - 1];
                if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            }
        };

        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            previouslyFocused.current?.focus();
        };
    }, [project, onClose, canNavigate]);

    useEffect(() => setImageIndex(0), [project?.id]);

    if (!project) return null;

    const period = formatPeriod(project.start, project.end);
    const projectDomains = project.domains.map(domainById).filter((d): d is NonNullable<typeof d> => Boolean(d));

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            aria-modal="true"
            role="dialog"
            aria-labelledby="project-detail-title"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Floating prev project (desktop) */}
            {canNavigate && siblings?.prev && (
                <button
                    type="button"
                    onClick={goPrevProject}
                    aria-label={`Previous project: ${siblings.prev.title}`}
                    title={`Previous: ${siblings.prev.title} (Shift + ←)`}
                    className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 shadow-lg text-gray-700 dark:text-gray-200 transition-colors"
                >
                    <FiChevronLeft size={22} />
                </button>
            )}
            {canNavigate && siblings?.next && (
                <button
                    type="button"
                    onClick={goNextProject}
                    aria-label={`Next project: ${siblings.next.title}`}
                    title={`Next: ${siblings.next.title} (Shift + →)`}
                    className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 shadow-lg text-gray-700 dark:text-gray-200 transition-colors"
                >
                    <FiChevronRight size={22} />
                </button>
            )}

            {/* Sheet / Modal */}
            <div
                ref={dialogRef}
                className="relative z-10 flex flex-col w-full sm:max-w-2xl sm:mx-4 bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92dvh] overflow-hidden"
            >
                {/* Drag handle — mobile only */}
                <div className="sm:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
                    <div className="w-10 h-1 rounded-full bg-gray-300 dark:bg-slate-600" />
                </div>

                {/* Sticky header */}
                <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-gray-100 dark:border-slate-700 flex-shrink-0">
                    <div className="flex items-center gap-3 min-w-0">
                        <img src={project.companyLogo} alt={project.company} className="w-8 h-8 rounded-full flex-shrink-0" />
                        <div className="min-w-0">
                            <h3 id="project-detail-title" className="font-bold text-gray-900 dark:text-gray-50 truncate leading-tight">{project.title}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate flex items-center gap-1.5">
                                <span>{project.company} · {period}</span>
                                {project.teamSize !== undefined && (
                                    <>
                                        <span aria-hidden="true">·</span>
                                        <span className="inline-flex items-center gap-1" title={`Team size: ${project.teamSize}`}>
                                            <FiUsers size={11} aria-hidden="true" />
                                            <span>{project.teamSize}</span>
                                        </span>
                                    </>
                                )}
                            </p>
                            {(project.country || project.clientType) && (
                                <p className="text-xs text-gray-600 dark:text-gray-300 truncate flex items-center gap-1.5 mt-0.5">
                                    {project.country && (
                                        <span className="inline-flex items-center gap-1.5">
                                            <Flag code={project.country} size="sm" />
                                            <span>{countryName(project.country)}</span>
                                        </span>
                                    )}
                                    {project.country && project.clientType && <span className="text-gray-400">·</span>}
                                    {project.clientType && <span>{project.clientType}</span>}
                                </p>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400 transition-colors"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                {/* Mobile prev/next project row */}
                {canNavigate && (
                    <div className="sm:hidden flex items-stretch border-b border-gray-100 dark:border-slate-700 flex-shrink-0">
                        <button
                            type="button"
                            onClick={goPrevProject}
                            disabled={!siblings?.prev}
                            aria-label={siblings?.prev ? `Previous project: ${siblings.prev.title}` : 'No previous project'}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                        >
                            <FiChevronLeft size={14} />
                            <span className="truncate">{siblings?.prev ? siblings.prev.title : 'Previous'}</span>
                        </button>
                        <span className="w-px bg-gray-100 dark:bg-slate-700" />
                        <button
                            type="button"
                            onClick={goNextProject}
                            disabled={!siblings?.next}
                            aria-label={siblings?.next ? `Next project: ${siblings.next.title}` : 'No next project'}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                        >
                            <span className="truncate">{siblings?.next ? siblings.next.title : 'Next'}</span>
                            <FiChevronRight size={14} />
                        </button>
                    </div>
                )}

                {/* Scrollable body */}
                <div className="overflow-y-auto flex-1 px-5 py-4 space-y-5">
                    {/* Image gallery */}
                    {imgs.length > 0 && (
                        <div>
                            <div className="relative w-full h-52 rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800">
                                <img
                                    src={imgs[imageIndex]}
                                    alt={`${project.title} screenshot ${imageIndex + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                {imgs.length > 1 && (
                                    <>
                                        <button onClick={prevImage} aria-label="Previous image" className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors">
                                            <FiChevronLeft size={18} />
                                        </button>
                                        <button onClick={nextImage} aria-label="Next image" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors">
                                            <FiChevronRight size={18} />
                                        </button>
                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                                            {imgs.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setImageIndex(i)}
                                                    aria-label={`Image ${i + 1}`}
                                                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === imageIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                            {imgs.length > 1 && (
                                <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                                    {imgs.map((src, i) => (
                                        <button
                                            key={src}
                                            onClick={() => setImageIndex(i)}
                                            className={`w-16 h-10 flex-shrink-0 rounded-lg overflow-hidden transition-all ${i === imageIndex ? 'ring-2 ring-teal-500' : 'ring-1 ring-gray-200 dark:ring-slate-700 opacity-60 hover:opacity-100'}`}
                                        >
                                            <img src={src} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                        {project.role && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300">
                                {project.role}
                            </span>
                        )}
                    </div>

                    {/* Overview */}
                    <section>
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">Overview</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{project.summary}</p>
                    </section>

                    {/* Domains */}
                    {projectDomains.length > 0 && (
                        <section>
                            <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">Domains</h4>
                            <div className="flex flex-wrap gap-2">
                                {projectDomains.map(d => (
                                    <span key={d.id} className="px-2.5 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" title={d.description}>
                                        {d.label}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Responsibilities */}
                    <section>
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">Responsibilities</h4>
                        <ul className="space-y-1.5">
                            {project.responsibilities.map((r, i) => (
                                <li key={i} className="flex gap-2 text-sm text-gray-700 dark:text-gray-200">
                                    <span className="text-teal-400 mt-0.5 flex-shrink-0">›</span>
                                    {r}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Technologies */}
                    <section>
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map(t => (
                                <span key={t} className="px-2.5 py-1 text-xs rounded-lg border border-cyan-200 dark:border-cyan-600 text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-800">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
