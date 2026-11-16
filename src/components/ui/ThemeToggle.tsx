import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = () => {
    const { theme, toggle } = useTheme();

    return (
        <button
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="glass glass-hover w-9 h-9 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            style={{ color: 'var(--text)' }}
        >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>
    );
};
