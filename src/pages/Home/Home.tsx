import React, { Suspense, useCallback, useMemo, useState } from "react";
import site from "../../data/site";
import projects from "../../data/projects";
import skills from "../../data/skills";
import experience, { type ExperienceItem } from "../../data/experience";
import SkillGroup from "../../components/skills/SkillGroup";
import ResumeButton from "../../components/ui/ResumeButton";
import photo from "../../assets/photo.jpg";

import { Container } from "../../components/layout/Container";
import { Section } from "../../components/layout/Section";
import { Footer } from "../../core/Footer";
import { Header } from "../../core/Header";
import { ContactLinks } from "../../components/ui/ContactLinks";

const FeaturedCarousel = React.lazy(() => import("../../components/projects/FeaturedCarousel").then(m => ({ default: m.FeaturedCarousel })));
const ProjectDetail = React.lazy(() => import("../../components/projects/ProjectDetail").then(m => ({ default: m.default })));

export const Home: React.FC = () => {
    const [selected, setSelected] = useState<null | typeof projects[0]>(null);

    const handleSelect = useCallback((p: typeof projects[0]) => setSelected(p), []);
    const handleClose = useCallback(() => setSelected(null), []);

    const experienceNodes = useMemo(() => (
        experience.map((it: ExperienceItem) => (
            <article key={`${it.company}-${it.start}`} className="mb-4 border border-gray-200 dark:border-slate-700 rounded p-4 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition cursor-pointer transform hover:-translate-y-1">
                <div className="flex gap-2">
                    <img src={it.companyLogo} alt={it.company} className="w-6 h-6 rounded-full" />
                    <h4 className="font-semibold">{it.company}</h4>
                </div>
                <p className="text-sm dark:text-gray-300">{it.role}</p>
                <p className="text-sm dark:text-gray-400">{it.start} {it.end ? `— ${it.end}` : ''} {it.location ? `· ${it.location}` : ''}</p>
                <ul className="mt-2 list-disc pl-5 text-sm dark:text-gray-200">
                    {it.bullets.map((b: string, i: number) => (
                        <li key={i}>{b}</li>
                    ))}
                </ul>
            </article>
        ))
    ), []);

    const skillGroups = useMemo(() => skills.map((g: any) => (
        <div key={g.group}>
            <SkillGroup group={g.group} items={g.items} />
        </div>
    )), []);

    return (
        <>
            <Header />

            <Section>
                <Container id="hero" className="flex flex-col sm:flex-row items-start gap-6 border-b border-gray-200 dark:border-slate-700 py-6">
                    <div className="shrink-0 mx-auto sm:mx-0">
                        <img src={photo} loading="lazy" alt={site.name} className="w-28 h-36 sm:w-36 sm:h-44 object-cover rounded-xl border border-gray-200 dark:border-slate-600 shadow-md" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">{site.name}</h1>
                        <div className="mt-1.5 mb-3">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full ${site.openToOpportunities ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${site.openToOpportunities ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                {site.openToOpportunities ? 'Open to opportunities' : 'Not in active search'}
                            </span>
                        </div>
                        <p className="text-base text-gray-600 dark:text-gray-400">{site.title} · {site.location}</p>
                        <p className="mt-2 mb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{site.coverletter}</p>
                        <div className="mb-4">
                            <ContactLinks variant="block" />
                        </div>
                        <ResumeButton />
                    </div>
                </Container>

                <Container id="projects" className="mt-4 py-4 border-b border-gray-200 dark:border-slate-700">
                    <h2 className="text-2xl font-semibold">Featured Projects</h2>
                    <div className="mt-4">
                        <Suspense fallback={<div className="h-48 bg-gray-50 dark:bg-slate-800 rounded" />}>
                            <FeaturedCarousel projects={projects} onSelect={handleSelect} />
                        </Suspense>
                    </div>
                </Container>

                <Container id="experience" className="mt-4 py-4 border-b border-gray-200 dark:border-slate-700">
                    <h2 className="text-2xl font-semibold">Experience</h2>
                    <div className="mt-4">{experienceNodes}</div>
                </Container>

                <Container id="skills" className="mt-8">
                    <h2 className="text-2xl font-semibold">Skills</h2>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">{skillGroups}</div>
                </Container>
            </Section>

            <Footer />

            <Suspense fallback={null}>
                <ProjectDetail project={selected} onClose={handleClose} />
            </Suspense>
        </>
    );
}

export default Home;