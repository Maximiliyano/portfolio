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
            className="group glass glass-hover lift-hover h-full flex flex-col rounded-2xl cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            aria-label={onClick ? `View details: ${project.title}` : undefined}
        >
            <div className="relative w-full h-44 bg-[var(--glass-strong)] overflow-hidden shrink-0">
                <img src={thumb} alt={`${project.title} thumbnail`} className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-105" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/70 via-transparent to-transparent" />
                <div className="absolute left-3 top-3 flex items-center gap-2 glass !bg-[var(--surface)] rounded-full px-3 py-1">
                    <img src={project.company.logo} alt={project.company.name} className="w-5 h-5 rounded-full" />
                    <div className="text-xs leading-tight">
                        <div className="font-semibold flex items-center gap-2">
                            <span>{project.company.name}</span>
                            <div className="flex items-center">
                                {project.country && <Flag code={project.country} size="sm" />}
                            </div>
                        </div>
                        <div className="font-mono text-[0.68rem] text-[var(--muted)] flex items-center gap-1.5">
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
            </div>

            <div className="flex flex-col flex-1 p-4 gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                    {project.role && (
                        <span className="chip !text-[var(--accent)] !border-[color-mix(in_srgb,var(--accent)_40%,transparent)]">
                            {project.role}
                        </span>
                    )}
                </div>

                <h3 className="font-display font-semibold leading-snug">{project.title}</h3>

                <p className="text-sm text-[var(--muted)] line-clamp-2 flex-1">{project.summary}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech.slice(0, 5).map(t => (
                        <span key={t} className="chip">
                            {t}
                        </span>
                    ))}
                </div>

                <div className="mt-auto pt-2 flex justify-end">
                    <span className="inline-flex items-center gap-1 font-mono text-xs font-medium text-[var(--accent)] group-hover:underline">
                        View details
                        <FiArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;
