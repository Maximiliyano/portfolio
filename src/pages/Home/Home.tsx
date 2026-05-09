import React, { Suspense, useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import projects from '../../data/projects';
import { domains, type DomainId } from '../../data/domains';
import { Section } from '../../components/layout/Section';
import { Header } from '../../core/Header';
import { Footer } from '../../core/Footer';
import { HeroSection } from '../../components/sections/HeroSection';
import { ProjectsSection } from '../../components/sections/ProjectsSection';
import { DomainsSection } from '../../components/sections/DomainsSection';
import { ExperienceSection } from '../../components/sections/ExperienceSection';
import { SkillsSection } from '../../components/sections/SkillsSection';
import { CtaSection } from '../../components/sections/CtaSection';

const ProjectDetail = React.lazy(() => import('../../components/projects/ProjectDetail'));

const validDomainIds = new Set<string>(domains.map(d => d.id));

export const Home: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedDomains = useMemo(() => {
        const fromUrl = searchParams.getAll('domain').filter(d => validDomainIds.has(d)) as DomainId[];
        return new Set<DomainId>(fromUrl);
    }, [searchParams]);

    const setSelectedDomains = useCallback((next: Set<DomainId>) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.delete('domain');
            for (const id of next) params.append('domain', id);
            return params;
        }, { replace: true });
    }, [setSearchParams]);

    const handleToggleDomain = useCallback((id: DomainId) => {
        const next = new Set(selectedDomains);
        if (next.has(id)) next.delete(id); else next.add(id);
        setSelectedDomains(next);
    }, [selectedDomains, setSelectedDomains]);

    const handleClearDomains = useCallback(() => {
        setSelectedDomains(new Set());
    }, [setSelectedDomains]);

    const filteredProjects = useMemo(() => {
        if (selectedDomains.size === 0) return projects;
        return projects.filter(p => p.domains.some(d => selectedDomains.has(d)));
    }, [selectedDomains]);

    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selectedIndex = useMemo(() => {
        if (selectedId === null) return -1;
        return filteredProjects.findIndex(p => p.id === selectedId);
    }, [selectedId, filteredProjects]);

    const selected = selectedIndex >= 0 ? filteredProjects[selectedIndex] : null;

    const handleSelect = useCallback((id: string) => setSelectedId(id), []);
    const handleClose = useCallback(() => setSelectedId(null), []);

    const handleNavigate = useCallback((delta: 1 | -1) => {
        if (filteredProjects.length === 0) return;
        setSelectedId(prevId => {
            if (prevId === null) return prevId;
            const idx = filteredProjects.findIndex(p => p.id === prevId);
            if (idx < 0) return prevId;
            const nextIdx = (idx + delta + filteredProjects.length) % filteredProjects.length;
            return filteredProjects[nextIdx].id;
        });
    }, [filteredProjects]);

    const siblings = useMemo(() => {
        if (selectedIndex < 0 || filteredProjects.length <= 1) {
            return { prev: null, next: null };
        }
        const len = filteredProjects.length;
        return {
            prev: filteredProjects[(selectedIndex - 1 + len) % len],
            next: filteredProjects[(selectedIndex + 1) % len],
        };
    }, [selectedIndex, filteredProjects]);

    const isDialogOpen = selected !== null;

    return (
        <>
            <Header />
            <Section>
                <HeroSection />
                <ProjectsSection
                    projects={filteredProjects}
                    totalProjects={projects.length}
                    onSelect={p => handleSelect(p.id)}
                    paused={isDialogOpen}
                />
                <DomainsSection
                    selected={selectedDomains}
                    onToggle={handleToggleDomain}
                    onClear={handleClearDomains}
                />
                <ExperienceSection />
                <SkillsSection />
                <CtaSection />
            </Section>
            <Footer />
            <Suspense fallback={null}>
                <ProjectDetail
                    project={selected}
                    onClose={handleClose}
                    onNavigate={handleNavigate}
                    siblings={siblings}
                />
            </Suspense>
        </>
    );
};

export default Home;
