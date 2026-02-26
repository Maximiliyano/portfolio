import React, { Suspense } from 'react';
import type { Project } from '../../data/projects';
import projects from '../../data/projects';
import { Container } from '../layout/Container';

const FeaturedCarousel = React.lazy(() =>
    import('../projects/FeaturedCarousel').then(m => ({ default: m.FeaturedCarousel }))
);

type Props = { onSelect: (p: Project) => void };

export const ProjectsSection: React.FC<Props> = ({ onSelect }) => (
    <Container id="projects" className="mt-4 py-4 border-b border-gray-200 dark:border-slate-700">
        <h2 className="text-2xl font-semibold">Featured Projects</h2>
        <div className="mt-4">
            <Suspense fallback={<div className="h-48 bg-gray-50 dark:bg-slate-800 rounded-xl animate-pulse" />}>
                <FeaturedCarousel projects={projects} onSelect={onSelect} />
            </Suspense>
        </div>
    </Container>
);
