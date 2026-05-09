import React from 'react';
import { FiUsers, FiArrowRight } from 'react-icons/fi';
import type { Project } from '../../data/projects';
import { Flag } from '../ui/Flag';
import { formatPeriod } from '../../lib/dateMath';

type Props = { project: Project; onClick?: (p: Project) => void };

const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
    const thumb = project.images?.length ? project.images[0] : '/src/assets/placeholder.png';
    const period = formatPeriod(project.start, project.end);

    return (
        <article
            onClick={() => onClick?.(project)}
            className="group h-full flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            aria-label={onClick ? `View details: ${project.title}` : undefined}
        >
            <div className="relative w-full h-44 bg-gray-100 dark:bg-slate-700 overflow-hidden shrink-0">
                <img src={thumb} alt={`${project.title} thumbnail`} className="w-full h-full object-cover" />
                <div className="absolute left-3 top-3 flex items-center gap-2 bg-white/85 dark:bg-slate-900/80 backdrop-blur-sm rounded-full px-3 py-1">
                    <img src={project.companyLogo} alt={project.company} className="w-5 h-5 rounded-full" />
                    <div className="text-xs leading-tight">
                        <div className="font-semibold flex items-center gap-2">
                            <span>{project.company}</span>
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                            <span>{period}</span>
                            {project.teamSize !== undefined && (
                                <>
                                    <span aria-hidden="true">·</span>
                                    <span className="inline-flex items-center gap-1" title={`Team size: ${project.teamSize}`}>
                                        <FiUsers size={11} aria-hidden="true" />
                                        <span>{project.teamSize}</span>
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="absolute right-3 top-3 flex items-center gap-2 bg-white/85 dark:bg-slate-900/80 backdrop-blur-sm rounded-full px-3 py-1">
                    {project.country && <Flag code={project.country} size="sm" />}
                </div>
            </div>

            <div className="flex flex-col flex-1 p-4 gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                    {project.role && (
                        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300">
                            {project.role}
                        </span>
                    )}
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-gray-50 leading-snug">{project.title}</h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">{project.summary}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech.slice(0, 5).map(t => (
                        <span key={t} className="px-2 py-0.5 text-xs rounded-md bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-300">
                            {t}
                        </span>
                    ))}
                </div>

                <div className="mt-auto pt-2 flex justify-end">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-600 dark:text-teal-400 group-hover:underline">
                        View details
                        <FiArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;
