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
                className="btn-ghost !py-1.5 !px-3 !text-[var(--accent)] !border-[color-mix(in_srgb,var(--accent)_55%,transparent)]"
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
            className="btn-primary"
        >
            <FaFileAlt size={14} aria-hidden="true" />
            Resume
        </a>
    );
};

export default ResumeButton;
