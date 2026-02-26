import React, { useEffect, useRef, useState } from 'react';
import type { Project } from '../../data/projects';
import ProjectCard from './ProjectCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type Props = { projects: Project[]; onSelect?: (p: Project) => void };

export const FeaturedCarousel: React.FC<Props> = ({ projects, onSelect }) => {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const draggingRef = useRef(false);
    const startXRef = useRef(0);
    const deltaXRef = useRef(0);
    const lastXRef = useRef(0);
    const lastTRef = useRef(0);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => setContainerWidth(el.clientWidth));
        ro.observe(el);
        setContainerWidth(el.clientWidth);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        if (!projects || projects.length <= 1) return;
        if (isPaused) return;
        const t = setInterval(() => setIndex((i) => (i + 1) % projects.length), 4500);
        return () => clearInterval(t);
    }, [projects.length, isPaused]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + projects.length) % projects.length);
            if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % projects.length);
            if (e.key === 'Enter') onSelect && onSelect(projects[index]);
        };
        el.addEventListener('keydown', onKey);
        return () => el.removeEventListener('keydown', onKey);
    }, [projects, index, onSelect]);

    if (!projects || projects.length === 0) return null;

    const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);
    const next = () => setIndex((i) => (i + 1) % projects.length);

    const gap = 16;
    const peek = Math.min(120, Math.round(containerWidth * 0.12));
    const slideWidth = Math.round(Math.max(280, Math.min(720, containerWidth - peek * 2)));
    const baseOffset = slideWidth + gap;
    const centerOffset = Math.round((containerWidth - slideWidth) / 2) - peek;

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const onPointerDown = (e: PointerEvent) => {
            draggingRef.current = true;
            startXRef.current = e.clientX;
            deltaXRef.current = 0;
            lastXRef.current = e.clientX;
            lastTRef.current = e.timeStamp;
            setIsPaused(true);
            try {
                (e.target as Element).setPointerCapture(e.pointerId);
            } catch { }
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!draggingRef.current) return;
            deltaXRef.current = e.clientX - startXRef.current;
            const translate = -index * baseOffset + deltaXRef.current + centerOffset;
            track.style.transform = `translateX(${translate}px)`;
            track.style.transition = 'none';

            lastXRef.current = e.clientX;
            lastTRef.current = e.timeStamp;
        };

        const onPointerUp = (e?: PointerEvent) => {
            if (!draggingRef.current) return;
            draggingRef.current = false;
            setIsPaused(false);
            const dx = deltaXRef.current;
            const threshold = Math.max(60, containerWidth * 0.08);
            const lastX = lastXRef.current || startXRef.current;
            const lastT = lastTRef.current || 0;
            const dt = (e?.timeStamp || performance.now()) - lastT;
            const velocity = dt > 0 ? (lastX - startXRef.current) / dt : 0;

            if (Math.abs(velocity) > 0.5) {
                // flick
                if (velocity > 0) prev();
                else next();
            } else if (dx > threshold) {
                prev();
            } else if (dx < -threshold) {
                next();
            } else {
                setIndex((i) => i);
            }
            deltaXRef.current = 0;
        };

        track.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        return () => {
            track.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
        };
    }, [index, baseOffset, containerWidth]);

    const trackTranslate = -index * baseOffset + centerOffset;

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative w-full overflow-hidden"
        >
            <div className="overflow-visible" style={{ padding: `0 ${peek}px`, boxSizing: 'border-box' }}>
                <div
                    ref={trackRef}
                    className="flex items-stretch"
                    style={{
                        gap: `${gap}px`,
                        transform: `translateX(${trackTranslate}px)`,
                        transition: 'transform 600ms cubic-bezier(.22,.9,.32,1)'
                    }}
                >
                    {projects.map((p, i) => (
                        <div
                            key={p.id}
                            style={{ width: `${slideWidth}px`, flex: '0 0 auto' }}
                            className={`transition-all duration-500 ${i === index ? 'scale-100 opacity-100' : 'scale-[0.96] opacity-50'}`}>
                            <ProjectCard project={p} onClick={onSelect} />
                        </div>
                    ))}
                </div>
            </div>

            {projects.length > 1 && (
                <div className="mt-4 flex items-center justify-center gap-3">
                    <button
                        aria-label="Previous"
                        onClick={prev}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 shadow border border-gray-200 dark:border-slate-600 transition-colors"
                    >
                        <FaChevronLeft size={12} />
                    </button>

                    <div className="flex gap-2">
                        {projects.map((p, i) => (
                            <button
                                key={p.id}
                                onClick={() => setIndex(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`rounded-full transition-all duration-300 ${i === index ? 'bg-teal-500 w-5 h-2' : 'bg-gray-300 dark:bg-slate-600 w-2 h-2'}`}
                            />
                        ))}
                    </div>

                    <button
                        aria-label="Next"
                        onClick={next}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 shadow border border-gray-200 dark:border-slate-600 transition-colors"
                    >
                        <FaChevronRight size={12} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default FeaturedCarousel;
