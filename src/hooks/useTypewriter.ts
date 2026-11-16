import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

type Phase = 'typing' | 'erasing';

export const useTypewriter = (phrases: string[], typeMs = 42, eraseMs = 22, holdMs = 1700): string => {
    const [reduced] = useState(prefersReducedMotion);
    const [index, setIndex] = useState(0);
    const [text, setText] = useState('');
    const [phase, setPhase] = useState<Phase>('typing');

    useEffect(() => {
        if (reduced || phrases.length === 0) return;
        const full = phrases[index];
        let timer: number;

        if (phase === 'typing') {
            if (text.length < full.length) {
                timer = window.setTimeout(() => setText(full.slice(0, text.length + 1)), typeMs);
            } else {
                timer = window.setTimeout(() => setPhase('erasing'), holdMs);
            }
        } else if (text.length > 0) {
            timer = window.setTimeout(() => setText(text.slice(0, -1)), eraseMs);
        } else {
            timer = window.setTimeout(() => {
                setIndex(i => (i + 1) % phrases.length);
                setPhase('typing');
            }, 0);
        }

        return () => window.clearTimeout(timer);
    }, [text, phase, index, phrases, reduced, typeMs, eraseMs, holdMs]);

    return reduced ? (phrases[0] ?? '') : text;
};
