import site from '../../data/site';
import { Container } from '../layout/Container';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';
import ResumeButton from '../ui/ResumeButton';

export const CtaSection = () => {
    const open = site.openToOpportunities;

    return (
        <Container id="cta" className="mt-4 py-8">
            <div className="featured-frame">
                <div className="relative overflow-hidden rounded-[0.9rem] p-8 md:p-10 text-center">
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold">
                            {open ? 'Interested in my experience?' : 'Thanks for visiting!'}
                        </h2>
                        <p className="mt-3 max-w-lg mx-auto text-sm md:text-base text-[var(--muted)]">
                            {open
                                ? "I'm actively looking for new opportunities and would love to discuss how I can contribute to your team."
                                : "I'm not actively searching right now, but feel free to reach out — I'm always happy to connect."
                            }
                        </p>

                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                            <a href={`mailto:${site.email}`} className="btn-primary">
                                <FaEnvelope size={14} />
                                Email
                            </a>
                            <a
                                href={site.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-ghost"
                            >
                                <FaLinkedin size={14} />
                                LinkedIn
                            </a>
                            <ResumeButton />
                        </div>

                        <p className="mt-4 text-xs text-[var(--muted)]">
                            {site.email} &middot; {site.location}
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    );
};
