import React, { Suspense, useMemo } from 'react';
import type { Project } from '../../data/projects';
import allProjects from '../../data/projects';
import { CollapsibleSection } from '../layout/CollapsibleSection';
import { formatYearsMonths, rangeFrom, totalMonths } from '../../lib/dateMath';

const FeaturedCarousel = React.lazy(() =>
    import('../projects/FeaturedCarousel').then(m => ({ default: m.FeaturedCarousel }))
);

type Props = {
    projects: Project[];
    totalProjects?: number;
    onSelect: (p: Project) => void;
    paused?: boolean;
};

export const ProjectsSection: React.FC<Props> = ({ projects, totalProjects, onSelect, paused }) => {
    const totalLabel = useMemo(() => {
        const ranges = allProjects.map(p => rangeFrom(p.start, p.end));
        return formatYearsMonths(totalMonths(ranges));
    }, []);

    const headlineCount = totalProjects ?? allProjects.length;

    return (
        <CollapsibleSection
            id="projects"
            title="Featured Projects"
            meta={
                <div className="flex items-center gap-3 text-xs font-mono text-[var(--muted)]">
                    <span>{headlineCount} {headlineCount === 1 ? 'project' : 'projects'}</span>
                    <span>·</span>
                    <span>{totalLabel} total</span>
                </div>
            }
        >
            {projects.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[var(--border-strong)] p-8 text-center text-sm font-mono text-[var(--muted)]">
                    No projects match the selected domains.
                </div>
            ) : (
                <Suspense fallback={<div className="h-48 glass rounded-2xl animate-pulse" />}>
                    <FeaturedCarousel projects={projects} onSelect={onSelect} paused={paused} />
                </Suspense>
            )}
        </CollapsibleSection>
    );
};
