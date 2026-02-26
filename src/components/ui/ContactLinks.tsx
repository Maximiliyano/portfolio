import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

import site from "../../data/site";

interface ContactLinksProps {
    showLabel?: boolean;
    variant?: 'icons' | 'block';
}

export const ContactLinks: React.FC<ContactLinksProps> = ({ showLabel = false, variant = 'icons' }) => {
    if (variant === 'block') {
        return (
            <div className="flex flex-wrap gap-2">
                <a href={site.github} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 text-sm hover:border-teal-400 hover:text-teal-500 transition-colors">
                    <FaGithub size={14} /> GitHub
                </a>
                <a href={site.linkedin} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 text-sm hover:border-teal-400 hover:text-teal-500 transition-colors">
                    <FaLinkedin size={14} /> LinkedIn
                </a>
                <a href={`mailto:${site.email}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 text-sm hover:border-teal-400 hover:text-teal-500 transition-colors">
                    <FaEnvelope size={14} /> Email
                </a>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4">
            {showLabel && <p className="text-sm">Contact Me:</p>}
            <a href={site.github} target="_blank" rel="noreferrer" className="text-current hover:text-teal-400" title="Github"><FaGithub /></a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="text-current hover:text-teal-400" title="Linkedin"><FaLinkedin /></a>
            <a href={`mailto:${site.email}`} className="text-current hover:text-teal-400" title="Email"><FaEnvelope /></a>
        </div>
    );
};