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
                <a href={site.github} target="_blank" rel="noreferrer" className="btn-ghost">
                    <FaGithub size={14} /> GitHub
                </a>
                <a href={site.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
                    <FaLinkedin size={14} /> LinkedIn
                </a>
                <a href={`mailto:${site.email}`} className="btn-ghost">
                    <FaEnvelope size={14} /> Email
                </a>
            </div>
        );
    }

    const size = iconSize === 'lg' ? 22 : 16;

    return (
        <div className="flex items-center gap-5">
            {showLabel && <p className="text-sm hidden sm:block">Contact Me:</p>}
            <a href={site.github} target="_blank" rel="noreferrer" className="text-current hover:text-teal-400 transition-colors duration-300" title="Github"><FaGithub size={size} /></a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="text-current hover:text-teal-400 transition-colors duration-300" title="LinkedIn"><FaLinkedin size={size} /></a>
            <a href={`mailto:${site.email}`} className="text-current hover:text-teal-400 transition-colors duration-300" title="Email"><FaEnvelope size={size} /></a>
        </div>
    );
};