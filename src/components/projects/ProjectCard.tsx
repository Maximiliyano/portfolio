import React from 'react';
import type { Project } from '../../data/projects';

type Props = { project: Project; onClick?: (p: Project) => void };

const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
    const thumb = project.images?.length ? project.images[0] : '/src/assets/placeholder.png';

    return (
        <article
            onClick={() => onClick?.(project)}
            className="h-full flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {/* Thumbnail */}
            <div className="relative w-full h-44 bg-gray-100 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                <img src={thumb} alt={`${project.title} thumbnail`} className="w-full h-full object-cover" />
                <div className="absolute left-3 top-3 flex items-center gap-2 bg-white/85 dark:bg-slate-900/80 backdrop-blur-sm rounded-full px-3 py-1">
                    <img src={project.companyLogo} alt={project.company} className="w-5 h-5 rounded-full" />
                    <div className="text-xs leading-tight">
                        <div className="font-semibold">{project.company}</div>
                        <div className="text-gray-500 dark:text-gray-400">{project.period}</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-1 p-4 gap-2">
                {project.role && (
                    <span className="self-start text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                        {project.role}
                    </span>
                )}

                <h3 className="font-semibold text-gray-900 dark:text-gray-50 leading-snug">{project.title}</h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">{project.summary}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech.slice(0, 5).map(t => (
                        <span key={t} className="px-2 py-0.5 text-xs rounded-md bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;
