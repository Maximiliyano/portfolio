import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = () => {
    const { theme, toggle } = useTheme();

    return (
        <button
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-slate-700"
            style={{ color: 'var(--text)' }}
        >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>
    );
};
