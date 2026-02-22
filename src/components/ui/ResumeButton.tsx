import React from 'react';

import { FaFileAlt } from 'react-icons/fa';

type Props = { href?: string };

const ResumeButton: React.FC<Props> = ({ href = 'https://drive.google.com/file/d/1WlFfAlDmfNhNrY7E8flKo8JINtxXu0wZ/view?usp=sharing' }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label="Download resume"
            className="resume-btn inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg transform transition hover:scale-[1.02] active:scale-100 focus:outline-none focus:ring-4 focus:ring-teal-300"
        >
            <span className="relative w-6 h-6 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full animate-pulse-slow bg-white/10" />
                <FaFileAlt className="z-10" />
            </span>
            <span className="font-medium">Resume</span>
        </a>
    );
};

export default ResumeButton;
