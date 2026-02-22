import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

import site from "../../data/site";

interface ContactLinksProps {
    showLabel?: boolean;
};

export const ContactLinks: React.FC<ContactLinksProps> = ({ showLabel = false }) => {
    return (
        <div className="flex items-center gap-4">
            {showLabel && <p className="text-sm">Contact Me:</p>}
            <a href={site.github} target="_blank" rel="noreferrer" className="text-current hover:text-teal-400" title="Github"><FaGithub /></a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="text-current hover:text-teal-400" title="Linkedin"><FaLinkedin /></a>
            <a href={`mailto:${site.email}`} className="text-current hover:text-teal-400" title="Email"><FaEnvelope /></a>
        </div>
    );
};