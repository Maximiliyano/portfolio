import site from "../../data/site";
import projects from "../../data/projects";
import ProjectDetail from "../../components/projects/ProjectDetail";
import skills from "../../data/skills";
import experience, { type ExperienceItem } from "../../data/experience";
import SkillGroup from "../../components/skills/SkillGroup";
import ResumeButton from "../../components/ui/ResumeButton";
import photo from "../../assets/photo.jpg";

import { Container } from "../../components/layout/Container";
import { Section } from "../../components/layout/Section";
import { Footer } from "../../core/Footer";
import { Header } from "../../core/Header";
import { useState } from "react";
import { FeaturedCarousel } from "../../components/projects/FeaturedCarousel";

export const Home = () => {
    const [selected, setSelected] = useState<null | typeof projects[0]>(null);

    return (
        <>
            <Header />

            <Section>
                <Container id="hero" className="flex items-center gap-6 border-b py-4">
                    <div className="w-40 h-40">
                        <img src={photo} alt="Photo" className="w-40 h-40 object-cover rounded-full" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">{site.name}</h1>
                            <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${site.openToOpportunities ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100' : 'bg-red-100 text-white dark:bg-red-700 dark:text-white-300'}`}>
                                {site.openToOpportunities ? 'Open to opportunities' : 'Not in active search'}
                            </span>
                        </div>
                        <p className="text-lg text-gray-700 dark:text-gray-300">{site.title} · {site.location}</p>
                        <p className="mt-3 mb-4 text-sm text-gray-700 dark:text-gray-200">{site.coverletter}</p>
                        <ResumeButton />
                    </div>
                </Container>

                <Container id="projects" className="mt-4 py-4 border-b">
                    <h2 className="text-2xl font-semibold">Featured Projects</h2>
                    <div className="mt-4">
                        <FeaturedCarousel projects={projects} onSelect={(p) => setSelected(p)} />
                    </div>
                </Container>

                <Container id="experience" className="mt-4 py-4 border-b">
                    <h2 className="text-2xl font-semibold">Experience</h2>
                    <div className="mt-4">
                        {experience.map((it: ExperienceItem) => (
                            <div key={`${it.company}-${it.start}`} className="mb-4 border rounded p-4 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition cursor-pointer transform hover:-translate-y-1">
                                <div className="flex gap-2">
                                    <img src={it.companyLogo} alt="company" className="w-6 h-6 rounded-full" />
                                    <h4 className="font-semibold">{it.company}</h4>
                                </div>
                                <p className="text-sm dark:text-gray-300">{it.role}</p>

                                <p className="text-sm dark:text-gray-400">{it.start} {it.end ? `— ${it.end}` : ''} {it.location ? `· ${it.location}` : ''}</p>
                                <ul className="mt-2 list-disc pl-5 text-sm dark:text-gray-200">
                                    {it.bullets.map((b: string, i: number) => (
                                        <li key={i}>{b}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Container>

                <Container id="skills" className="mt-8">
                    <h2 className="text-2xl font-semibold">Skills</h2>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {skills.map((g: any) => (
                            <div key={g.group}>
                                <SkillGroup group={g.group} items={g.items} />
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            <Footer />

            <ProjectDetail project={selected} onClose={() => setSelected(null)} />
        </>
    );
}

export default Home;