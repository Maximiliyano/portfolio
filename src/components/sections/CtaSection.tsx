import site from '../../data/site';
import { Container } from '../layout/Container';
import { FaEnvelope, FaLinkedin } from 'react-icons/fa';
import ResumeButton from '../ui/ResumeButton';

export const CtaSection = () => {
    const open = site.openToOpportunities;

    return (
        <Container className="mt-4 py-8">
            <div className={`relative overflow-hidden rounded-2xl p-8 md:p-10 text-center text-white ${
                open
                    ? 'bg-gradient-to-br from-teal-500 to-teal-700 dark:from-teal-600 dark:to-teal-800'
                    : 'bg-gradient-to-br from-slate-600 to-slate-800 dark:from-slate-700 dark:to-slate-900'
            }`}>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white" />
                </div>

                <div className="relative z-10">
                    {open && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full text-xs font-semibold bg-white/20 text-white">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Open to opportunities
                        </span>
                    )}

                    <h2 className="text-2xl md:text-3xl font-bold">
                        {open ? 'Interested in my experience?' : 'Thanks for visiting!'}
                    </h2>
                    <p className={`mt-3 max-w-lg mx-auto text-sm md:text-base ${open ? 'text-teal-100' : 'text-slate-300'}`}>
                        {open
                            ? "I'm actively looking for new opportunities and would love to discuss how I can contribute to your team."
                            : "I'm not actively searching right now, but feel free to reach out — I'm always happy to connect."
                        }
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <a
                            href={`mailto:${site.email}`}
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md transition-colors ${
                                open
                                    ? 'bg-white text-teal-700 hover:bg-teal-50'
                                    : 'bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            <FaEnvelope size={14} />
                            Email
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

                    <p className={`mt-4 text-xs ${open ? 'text-teal-200' : 'text-slate-400'}`}>
                        {site.email} &middot; {site.location}
                    </p>
                </div>
            </div>
        </Container>
    );
};
