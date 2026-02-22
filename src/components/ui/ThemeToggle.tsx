import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

// TODO: there is a bug of white text.
export const ThemeToggle: React.FC = () => {
    const [dark, setDark] = useState<boolean>(() => {
        try {
            const v = localStorage.getItem('theme');
            if (v === 'dark') return true;
            if (v === 'light') return false;
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        } catch {
            return false;
        }
    });

    useEffect(() => {
        const root = document.documentElement;
        if (dark) root.classList.add('dark');
        else root.classList.remove('dark');
        try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch { }
    }, [dark]);

    return (
        <button
            onClick={() => setDark((d) => !d)}
            aria-pressed={dark}
            aria-label="Toggle theme"
            title={dark ? 'Switch to light' : 'Switch to dark'}
            className="relative w-14 h-8 flex items-center bg-gray-200 dark:bg-slate-700 rounded-full p-1 transition-colors duration-300"
        >
            <span className={`absolute left-2 text-yellow-400 transition-opacity duration-300 ${dark ? 'opacity-100' : 'opacity-0'}`}>
                <FaSun />
            </span>
            <span className={`absolute right-2 text-indigo-200 transition-opacity duration-300 ${dark ? 'opacity-0' : 'opacity-100'}`}>
                <FaMoon />
            </span>

            <span
                className={`relative z-10 block w-6 h-6 bg-white dark:bg-slate-800 rounded-full transform transition-transform duration-300 ${dark ? 'translate-x-6' : 'translate-x-0'}`}
                style={{ boxShadow: '0 2px 6px rgba(2,6,23,0.12)' }}
            />
        </button>
    );
};

export default ThemeToggle;
