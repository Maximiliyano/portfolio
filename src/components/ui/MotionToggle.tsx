import { FiActivity } from 'react-icons/fi';
import { prefersReducedMotion, setMotion } from '../../lib/motion';

export const MotionToggle = () => {
    const reduced = prefersReducedMotion();

    return (
        <button
            type="button"
            onClick={() => setMotion(reduced ? 'full' : 'reduced')}
            aria-pressed={!reduced}
            aria-label="Animations"
            title={reduced ? 'Animations are off. Click to turn them on' : 'Animations are on. Click to turn them off'}
            className={`glass glass-hover w-9 h-9 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${reduced ? 'text-[var(--muted)]' : 'text-[var(--accent)]'}`}
        >
            <FiActivity size={16} className={reduced ? 'opacity-50' : ''} />
        </button>
    );
};

export default MotionToggle;
