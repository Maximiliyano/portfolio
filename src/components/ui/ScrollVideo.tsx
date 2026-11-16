import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/motion';

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export const ScrollVideo = ({ src }: { src: string }) => {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = ref.current;
        if (!video || prefersReducedMotion()) return;

        let frame = 0;
        let current = 0;

        const loop = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const progress = max > 0 ? clamp01(window.scrollY / max) : 0;
            if (video.duration) {
                current += (progress * video.duration - current) * 0.12;
                if (Math.abs(video.currentTime - current) > 0.02) video.currentTime = current;
            }
            frame = requestAnimationFrame(loop);
        };
        frame = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <video
            ref={ref}
            src={src}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-45 dark:mix-blend-screen"
        />
    );
};

export default ScrollVideo;
