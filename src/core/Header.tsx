import { useEffect, useState } from 'react';
import ResumeButton from '../components/ui/ResumeButton';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { FiCode, FiBriefcase, FiZap, FiMenu, FiX } from 'react-icons/fi';
import logoDark from '../assets/favicon.ico';
import logoLight from '../assets/favicon-white.ico';

const NAV_ITEMS = [
    { href: '#projects', icon: FiCode, label: 'Projects' },
    { href: '#experience', icon: FiBriefcase, label: 'Experience' },
    { href: '#skills', icon: FiZap, label: 'Skills' },
];

export const Header = () => {
    const { theme } = useTheme();
    const logo = theme === 'dark' ? logoLight : logoDark;
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
        if (link) link.href = logo;
    }, [logo]);

    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <header
            className="fixed top-0 left-0 w-full backdrop-blur-md z-50"
            style={{ backgroundColor: 'var(--surface)', color: 'var(--text)', borderBottom: '1px solid var(--border)' }}
        >
            <div className="flex justify-between items-center w-full max-w-6xl mx-auto px-4 py-3">
                <a href="/" aria-label="Portfolio Logo" className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="w-6 h-6" />
                    <span className="font-semibold">Portfolio</span>
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
                        <a key={href} href={href} className="flex items-center gap-1.5 text-sm font-semibold hover:text-teal-500 transition-colors">
                            <Icon size={15} />
                            {label}
                        </a>
                    ))}
                </nav>

                <ResumeButton />
                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div
                    className="md:hidden border-t"
                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                    <nav className="flex justify-around py-2 max-w-6xl mx-auto px-4">
                        {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
                            <a
                                key={href}
                                href={href}
                                title={label}
                                onClick={() => setMenuOpen(false)}
                                className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-teal-500 transition-colors"
                            >
                                <Icon size={22} />
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};
