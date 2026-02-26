import React, { Suspense, useCallback, useState } from 'react';
import type { Project } from '../../data/projects';
import { Section } from '../../components/layout/Section';
import { Header } from '../../core/Header';
import { Footer } from '../../core/Footer';
import { HeroSection } from '../../components/sections/HeroSection';
import { ProjectsSection } from '../../components/sections/ProjectsSection';
import { ExperienceSection } from '../../components/sections/ExperienceSection';
import { SkillsSection } from '../../components/sections/SkillsSection';

const ProjectDetail = React.lazy(() => import('../../components/projects/ProjectDetail'));

export const Home: React.FC = () => {
    const [selected, setSelected] = useState<Project | null>(null);
    const handleSelect = useCallback((p: Project) => setSelected(p), []);
    const handleClose = useCallback(() => setSelected(null), []);

    return (
        <>
            <Header />
            <Section>
                <HeroSection />
                <ProjectsSection onSelect={handleSelect} />
                <ExperienceSection />
                <SkillsSection />
            </Section>
            <Footer />
            <Suspense fallback={null}>
                <ProjectDetail project={selected} onClose={handleClose} />
            </Suspense>
        </>
    );
};

export default Home;
