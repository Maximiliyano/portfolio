import site from '../../data/site';
import { Container } from '../layout/Container';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';
import ResumeButton from '../ui/ResumeButton';

export const CtaSection = () => (
    <Container className="mt-4 py-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 dark:from-teal-600 dark:to-teal-800 p-8 md:p-10 text-center text-white">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white" />
            </div>

            <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold">
                    Interested in my experience?
                </h2>
                <p className="mt-3 text-teal-100 max-w-lg mx-auto text-sm md:text-base">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your team.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <a
                        href={`mailto:${site.email}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-teal-700 font-semibold text-sm hover:bg-teal-50 transition-colors shadow-md"
                    >
                        <FaEnvelope size={14} />
                        Get in Touch
                    </a>
                    <a
                        href={site.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                    >
                        <FaLinkedin size={14} />
                        LinkedIn
                    </a>
                    <ResumeButton />
                </div>

                <p className="mt-4 text-xs text-teal-200">
                    {site.email} &middot; {site.location}
                </p>
            </div>
        </div>
    </Container>
);
