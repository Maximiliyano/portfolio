import { useEffect, useState } from 'react';
import ResumeButton from '../components/ui/ResumeButton';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { MotionToggle } from '../components/ui/MotionToggle';
import { useTheme } from '../context/ThemeContext';
import { FiCpu, FiTerminal, FiBox, FiCode, FiBriefcase, FiZap, FiUser, FiMenu, FiX } from 'react-icons/fi';
import logoDark from '../assets/favicon.ico';
import logoLight from '../assets/favicon-white.ico';
import site from '../data/site';

const NAV_ITEMS = [
    { href: '#experience', icon: FiBriefcase, label: 'Experience' },
    { href: '#ai', icon: FiCpu, label: 'AI' },
    { href: '#terminal', icon: FiTerminal, label: 'Terminal' },
    { href: '#built', icon: FiBox, label: 'Built by me' },
    { href: '#projects', icon: FiCode, label: 'Client work' },
    { href: '#skills', icon: FiZap, label: 'Skills' },
    { href: '#about', icon: FiUser, label: 'About' },
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
        const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <header
            className="fixed top-0 left-0 w-full z-50"
            style={{ backgroundColor: 'var(--surface)', color: 'var(--text)', borderBottom: '1px solid var(--border)' }}
        >
            <div className="flex justify-between items-center w-full max-w-6xl mx-auto px-4 py-3 gap-4">
                <a href="/" aria-label="Home" className="font-display text-base font-semibold shrink-0">{site.name}</a>

                <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
                    {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
                        <a key={href} href={href} className="flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                            <Icon size={14} />
                            {label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <span className="hidden sm:block"><ResumeButton variant="header" /></span>
                    <MotionToggle />
                    <ThemeToggle />

                    <button
                        className="lg:hidden p-2 rounded-lg hover:bg-[var(--glass-strong)] transition-colors"
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
                    className="lg:hidden border-t"
                    style={{ borderColor: 'var(--border)' }}
                >
                    <nav className="flex flex-col gap-1 py-2 max-w-6xl mx-auto px-4" aria-label="Mobile">
                        {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
                            <a
                                key={href}
                                href={href}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--glass-strong)] hover:text-[var(--accent)] transition-colors text-sm font-medium"
                            >
                                <Icon size={18} />
                                {label}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};
