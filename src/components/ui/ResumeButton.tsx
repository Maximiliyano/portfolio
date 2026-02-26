import React from 'react';
import { FaFileAlt } from 'react-icons/fa';

type Props = { href?: string; variant?: 'hero' | 'header' };

const ResumeButton: React.FC<Props> = ({
    href = 'https://drive.google.com/file/d/1WlFfAlDmfNhNrY7E8flKo8JINtxXu0wZ/view?usp=sharing',
    variant = 'hero',
}) => {
    if (variant === 'header') {
        return (
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label="Redirect to resume"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-400 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
            >
                <FaFileAlt size={13} />
                Resume
            </a>
        );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label="Redirect to resume"
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold shadow-md hover:shadow-lg transition-all"
        >
            <span className="relative w-5 h-5 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full animate-pulse-slow bg-white/20" />
                <FaFileAlt className="z-10" size={14} />
            </span>
            Resume
        </a>
    );
};

export default ResumeButton;
