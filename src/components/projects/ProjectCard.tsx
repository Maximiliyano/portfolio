import React from 'react';
import type { Project } from '../../data/projects';

type Props = { project: Project; onClick?: (p: Project) => void };

export const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
    const thumb = project.images && project.images.length ? project.images[0] : '/src/assets/placeholder.png';

    return (
        <article
            onClick={() => onClick && onClick(project)}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden relative"
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            <div className="w-full h-44 bg-gray-100 dark:bg-slate-700 overflow-hidden relative">
                <img src={thumb} alt={`${project.title} thumbnail`} className="w-full h-full object-cover" />
                <div className="absolute left-3 top-3 flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full px-3 py-1">
                    <img src={project.companyLogo} alt="company" className="w-6 h-6 rounded-full" />
                    <div className="text-xs">
                        <div className="font-semibold">{project.company}</div>
                        <div className="text-gray-600 dark:text-gray-300">{project.period}</div>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{project.title}</h3>

                    {project.role && (
                        <div className="text-sm text-white dark:text-gray-300 whitespace-nowrap bg-blue-500 dark:bg-slate-700 px-2 py-1 rounded">{project.role}</div>
                    )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-3">{project.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech.slice(0, 6).map((t) => (
                        <span key={t} className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 dark:text-gray-200 rounded">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;
