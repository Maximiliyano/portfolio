import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

    return (
        <motion.div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
            style={{
                scaleX,
                background: 'linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))',
                boxShadow: '0 0 12px var(--accent)',
            }}
        />
    );
};

export default ScrollProgress;
