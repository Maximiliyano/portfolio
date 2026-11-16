import { useMemo } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import site from '../../data/site';
import projects from '../../data/projects';
import experience from '../../data/experience';
import stack from '../../data/stack';
import { rangeFrom, totalMonths } from '../../lib/dateMath';
import { useTypewriter } from '../../hooks/useTypewriter';
import { EASE_IN_OUT } from '../../lib/motion';
import { Container } from '../layout/Container';
import { ContactLinks } from '../ui/ContactLinks';
import ResumeButton from '../ui/ResumeButton';

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE_IN_OUT },
});

export const HeroSection = () => {
    const tagline = useTypewriter(site.taglines);

    const stats = useMemo(() => {
        const years = Math.floor(totalMonths(experience.map(e => rangeFrom(e.start, e.end))) / 12);
        return [
            { value: `${years}+`, label: 'years in software engineering' },
            { value: String(projects.length), label: 'client projects delivered' },
            { value: String(new Set(projects.flatMap(p => p.domains)).size), label: 'industries' },
            { value: String(new Set(projects.map(p => p.country)).size), label: 'client countries' },
        ];
    }, []);

    const { scrollY } = useScroll();
    const avatarY = useSpring(useTransform(scrollY, [0, 700], [0, -50]), { stiffness: 90, damping: 24, mass: 0.5 });

    return (
        <Container id="hero" className="pt-8 sm:pt-14 pb-4">
            <div className="flex flex-col-reverse md:flex-row md:items-center gap-10">
                <div className="flex-1 min-w-0">
                    <motion.h1 {...fadeUp(0)} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
                        {site.name}
                    </motion.h1>

                    <motion.p {...fadeUp(0.08)} className="mt-3 text-xl sm:text-2xl font-medium text-[var(--accent)]">
                        {site.title}
                    </motion.p>

                    <motion.p {...fadeUp(0.16)} className="mt-5 h-7 text-base" aria-label={site.taglines.join('. ')}>
                        <span aria-hidden="true">
                            {tagline}
                            <span className="cursor-blink text-[var(--accent)]">|</span>
                        </span>
                    </motion.p>

                    <motion.p {...fadeUp(0.24)} className="mt-3 max-w-xl text-[var(--muted)] leading-relaxed">
                        {site.coverletter}
                    </motion.p>

                    <motion.p {...fadeUp(0.3)} className="mt-5 text-sm text-[var(--muted)]">
                        {site.location} · {site.openToOpportunities ? 'Open to new roles' : 'Not looking for new roles right now'}
                    </motion.p>

                    <motion.div {...fadeUp(0.36)} className="mt-6 flex flex-wrap items-center gap-3">
                        <a href="#experience" className="btn-primary">
                            View experience <FiArrowRight size={16} />
                        </a>
                        <ResumeButton />
                        <ContactLinks variant="block" />
                    </motion.div>

                    <motion.ul {...fadeUp(0.44)} aria-label="Technology stack" className="mt-7 flex flex-wrap gap-x-5 gap-y-3 max-w-2xl">
                        {stack.map(({ name, Icon, color }) => (
                            <li key={name} className="inline-flex items-center gap-2 text-sm text-[var(--muted)]">
                                <Icon size={20} style={{ color }} aria-hidden="true" />
                                {name}
                            </li>
                        ))}
                    </motion.ul>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ y: avatarY }}
                    transition={{ duration: 0.7, ease: EASE_IN_OUT }}
                    className="shrink-0 mx-auto md:mx-0"
                >
                    <img
                        src={site.avatarUrl}
                        alt={site.name}
                        width={224}
                        height={288}
                        className="w-48 h-60 sm:w-56 sm:h-72 object-cover rounded-2xl border border-[var(--border-strong)] bg-[var(--glass-strong)] shadow-[0_24px_48px_-28px_rgba(14,22,32,0.45)]"
                    />
                </motion.div>
            </div>

            <motion.dl {...fadeUp(0.5)} className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 border-t border-[var(--border-strong)] pt-6">
                {stats.map(s => (
                    <div key={s.label} className="flex flex-col-reverse">
                        <dt className="mt-1 text-sm text-[var(--muted)]">{s.label}</dt>
                        <dd className="font-display text-3xl sm:text-4xl font-bold">{s.value}</dd>
                    </div>
                ))}
            </motion.dl>
        </Container>
    );
};
