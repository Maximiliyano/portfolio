import React, { useEffect, useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';

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
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed right-4 bottom-16 z-50 w-11 h-11 rounded-full bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 shadow-lg flex items-center justify-center transition-transform transform hover:translate-y-[-4px]"
            title="Back to top"
        >
            <FaChevronUp />
        </button>
    );
};

export default ScrollTop;
