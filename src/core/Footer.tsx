import site from "../data/site";
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full flex items-center justify-center shadow-md z-50" style={{ backgroundColor: 'var(--surface)', color: 'var(--text)', borderTop: '4px solid #0EA5A4' }}>
            <div className="w-full max-w-6xl px-4 py-3 flex items-center justify-between">
                <p className="text-sm">© 2026 {site.name}. All rights reserved.</p>
                <div className="flex items-center gap-4">
                    <a href={site.github} target="_blank" rel="noreferrer" className="text-current hover:text-teal-400"><FaGithub /></a>
                    <a href={site.linkedin} target="_blank" rel="noreferrer" className="text-current hover:text-teal-400"><FaLinkedin /></a>
                    <a href={`mailto:${site.email}`} className="text-current hover:text-teal-400"><FaEnvelope /></a>
                </div>
            </div>
        </footer>
    );
};