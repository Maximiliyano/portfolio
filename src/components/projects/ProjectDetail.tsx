import React, { useEffect, useRef, useState } from 'react';
import type { Project } from '../../data/projects';

type Props = { project: Project | null; onClose: () => void };

export const ProjectDetail: React.FC<Props> = ({ project, onClose }) => {
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const previouslyFocused = useRef<HTMLElement | null>(null);
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        if (!project) return;
        previouslyFocused.current = document.activeElement as HTMLElement | null;
        const dialog = dialogRef.current;
        const focusable = dialog?.querySelectorAll<HTMLElement>('a,button,input,textarea,[tabindex]');
        focusable?.[0]?.focus();

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') setImageIndex((i) => (i + 1) % (project.images?.length || 1));
            if (e.key === 'ArrowLeft') setImageIndex((i) => (i - 1 + (project.images?.length || 1)) % (project.images?.length || 1));

            if (e.key === 'Tab' && dialog) {
                const nodes = Array.from(dialog.querySelectorAll<HTMLElement>('a,button,input,textarea,[tabindex]')).filter((n) => !n.hasAttribute('disabled'));
                if (nodes.length === 0) return;
                const first = nodes[0];
                const last = nodes[nodes.length - 1];
                if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            }
        };

        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            previouslyFocused.current?.focus();
        };
    }, [project, onClose]);

    useEffect(() => setImageIndex(0), [project]);

    if (!project) return null;

    const imgs = project.images || [];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
            <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
            <div ref={dialogRef} className="relative bg-white dark:bg-slate-800 max-w-3xl w-full mx-4 p-6 rounded shadow-lg z-10">
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-600 dark:text-gray-300">&times;</button>

                {imgs.length > 0 && (
                    <div className='mt-4'>
                        <div className="w-full h-56 overflow-hidden rounded-md mb-3">
                            <img src={imgs[imageIndex]} alt={`${project.title} image ${imageIndex + 1}`} className="w-full h-full object-cover" />
                        </div>
                        {imgs.length > 1 && (
                            <div className="flex gap-2 mb-3">
                                {imgs.map((src, i) => (
                                    <button key={src} onClick={() => setImageIndex(i)} className={`w-16 h-10 overflow-hidden rounded ${i === imageIndex ? 'ring-2 ring-teal-500' : 'ring-1 ring-gray-200 dark:ring-slate-700'}`}>
                                        <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex justify-between">
                    <h3 className="text-2xl font-bold">{project.title}</h3>

                    {project.role && (
                        <p className="font-semibold text-sm text-white dark:text-gray-300 whitespace-nowrap bg-blue-500 dark:bg-slate-700 px-2 py-1 rounded">
                            {project.role}
                        </p>
                    )}
                </div>

                <div className="inline-flex gap-2 items-center">
                    <img src={project.companyLogo} alt="company logo" className="w-6 h-6 rounded-full" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">{project.company} · {project.period}</p>
                </div>

                <h4 className="mt-3 font-semibold text-sm text-gray-400 dark:text-gray-300">Overview:</h4>
                <p className="text-gray-700 dark:text-gray-200 mt-1">{project.summary}</p>

                <h4 className="mt-3 font-semibold text-sm text-gray-400 dark:text-gray-300">Responsibilities:</h4>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-200 mt-1">
                    {project.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                    ))}
                </ul>

                <h4 className="mt-3 font-semibold text-sm text-gray-400 dark:text-gray-300">Technologies:</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                    {project.tech.map((t) => (
                        <span key={t} className="px-2 py-1 border border-blue-600 bg-slate-300 dark:bg-slate-800 text-black dark:text-gray-200 rounded text-xs">{t}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
