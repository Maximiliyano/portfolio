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
            <article key={`${it.company}-${it.start}`} className="mb-4 border rounded p-4 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition cursor-pointer transform hover:-translate-y-1">
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
                <Container id="hero" className="flex items-center gap-6 border-b py-4">
                    <div className="w-40 h-40">
                        <img src={photo} loading="lazy" alt="Photo" className="w-40 h-40 object-cover rounded-full" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">{site.name}</h1>
                            <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${site.openToOpportunities ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100' : 'bg-red-700 text-white dark:text-white-300'}`}>
                                {site.openToOpportunities ? 'Open to opportunities' : 'Not in active search'}
                            </span>
                        </div>
                        <p className="mb-1 text-lg text-gray-700 dark:text-gray-300">{site.title} · {site.location}</p>
                        <ContactLinks />
                        <p className="mt-3 mb-4 text-sm text-gray-700 dark:text-gray-200">{site.coverletter}</p>
                        <ResumeButton />
                    </div>
                </Container>

                <Container id="projects" className="mt-4 py-4 border-b">
                    <h2 className="text-2xl font-semibold">Featured Projects</h2>
                    <div className="mt-4">
                        <Suspense fallback={<div className="h-48 bg-gray-50 dark:bg-slate-800 rounded" />}>
                            <FeaturedCarousel projects={projects} onSelect={handleSelect} />
                        </Suspense>
                    </div>
                </Container>

                <Container id="experience" className="mt-4 py-4 border-b">
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