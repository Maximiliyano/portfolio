import ResumeButton from '../components/ui/ResumeButton';
import ThemeToggle from '../components/ui/ThemeToggle';
import { FaEnvelope, FaPhone, FaGithub } from 'react-icons/fa';
import site from '../data/site';

// TODO: make contact me as a block with list of info
// TODO: add navigation to each block of the home page
export const Header = () => {
    return (
        <header
            className="fixed top-0 left-0 w-full backdrop-blur-md flex items-center justify-center shadow z-50"
            style={{ backgroundColor: 'var(--surface)', color: 'var(--text)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
        >
            <div className="flex justify-between items-center w-full max-w-6xl px-4 py-3">
                <a href="#hero" aria-label="Portfolio Logo" className="flex items-center gap-2">
                    <img src="/src/assets/favicon.ico" alt="Logo" className="w-6 h-6" />
                    <span className="font-semibold">Portfolio</span>
                </a>

                <a href='#projects' className="text-sm">Projects</a>
                <a href='#experience' className="text-sm">Experience</a>
                <a href='#skills' className="text-sm">Skills</a>

                <nav className="hidden md:flex gap-6 items-center">
                    <ResumeButton />
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
};