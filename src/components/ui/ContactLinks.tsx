import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

import site from "../../data/site";

interface ContactLinksProps {
    showLabel?: boolean;
    variant?: 'icons' | 'block';
    iconSize?: 'md' | 'lg';
}

export const ContactLinks: React.FC<ContactLinksProps> = ({ showLabel = false, variant = 'icons', iconSize = 'md' }) => {
    if (variant === 'block') {
        return (
            <div className="flex flex-wrap gap-2">
                <a href={site.github} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 text-sm hover:border-teal-400 hover:text-teal-500 transition-colors duration-200">
                    <FaGithub size={14} /> GitHub
                </a>
                <a href={site.linkedin} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 text-sm hover:border-teal-400 hover:text-teal-500 transition-colors duration-200">
                    <FaLinkedin size={14} /> LinkedIn
                </a>
                <a href={`mailto:${site.email}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 text-sm hover:border-teal-400 hover:text-teal-500 transition-colors duration-200">
                    <FaEnvelope size={14} /> Email
                </a>
            </div>
        );
    }

    const size = iconSize === 'lg' ? 22 : 16;

    return (
        <div className="flex items-center gap-5">
            {showLabel && <p className="text-sm hidden sm:block">Contact Me:</p>}
            <a href={site.github} target="_blank" rel="noreferrer" className="text-current hover:text-teal-400 transition-colors duration-200" title="Github"><FaGithub size={size} /></a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="text-current hover:text-teal-400 transition-colors duration-200" title="LinkedIn"><FaLinkedin size={size} /></a>
            <a href={`mailto:${site.email}`} className="text-current hover:text-teal-400 transition-colors duration-200" title="Email"><FaEnvelope size={size} /></a>
        </div>
    );
};