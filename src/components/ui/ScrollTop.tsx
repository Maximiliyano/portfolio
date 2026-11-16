import React, { useEffect, useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { scrollToTop } from '../../lib/smoothScroll';

const ScrollTop: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 220);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!visible) return null;

    return (
        <button
            aria-label="Scroll to top"
            onClick={scrollToTop}
            className="glass glass-hover fixed right-4 bottom-16 z-50 w-11 h-11 rounded-full text-[var(--accent)] flex items-center justify-center hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            title="Back to top"
        >
            <FaChevronUp />
        </button>
    );
};

export default ScrollTop;
