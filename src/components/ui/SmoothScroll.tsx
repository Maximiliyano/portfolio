import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { setLenis } from '../../lib/smoothScroll';
import { prefersReducedMotion } from '../../lib/motion';

export const SmoothScroll = () => {
    useEffect(() => {
        if (prefersReducedMotion()) return;

        const lenis = new Lenis({
            lerp: 0.085,
            wheelMultiplier: 0.95,
            smoothWheel: true,
            anchors: true,
        });
        setLenis(lenis);

        let frame = requestAnimationFrame(function raf(time) {
            lenis.raf(time);
            frame = requestAnimationFrame(raf);
        });

        return () => {
            cancelAnimationFrame(frame);
            lenis.destroy();
            setLenis(null);
        };
    }, []);

    return null;
};

export default SmoothScroll;
