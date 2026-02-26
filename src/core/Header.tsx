import { useEffect } from 'react';
import ResumeButton from '../components/ui/ResumeButton';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { FiCode, FiBriefcase, FiZap } from 'react-icons/fi';
import logoDark from '../assets/favicon.ico';
import logoLight from '../assets/favicon-white.ico';

export const Header = () => {
    const { theme } = useTheme();
    const logo = theme === 'dark' ? logoLight : logoDark;

    useEffect(() => {
        const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
        if (link) link.href = logo;
    }, [logo]);

    return (
        <header
            className="fixed top-0 left-0 w-full backdrop-blur-md flex items-center justify-center z-50"
            style={{ backgroundColor: 'var(--surface)', color: 'var(--text)', borderBottom: '1px solid var(--border)' }}
        >
            <div className="flex justify-between items-center w-full max-w-6xl px-4 py-3">
                <a href="/" aria-label="Portfolio Logo" className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="w-6 h-6" />
                    <span className="font-semibold">Portfolio</span>
                </a>

                <nav className="flex items-center gap-8">
                    <a href='#projects' className="flex items-center gap-1.5 text-sm font-semibold hover:text-teal-500 transition-colors">
                        <FiCode size={15} />
                        Projects
                    </a>
                    <a href='#experience' className="flex items-center gap-1.5 text-sm font-semibold hover:text-teal-500 transition-colors">
                        <FiBriefcase size={15} />
                        Experience
                    </a>
                    <a href='#skills' className="flex items-center gap-1.5 text-sm font-semibold hover:text-teal-500 transition-colors">
                        <FiZap size={15} />
                        Skills
                    </a>
                </nav>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <ResumeButton />
                </div>
            </div>
        </header>
    );
};