import React, { useCallback, useEffect, useId, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { EASE_IN_OUT as EASE } from '../../lib/motion';


type Props = {
    reveal?: boolean;
    id: string;
    title: React.ReactNode;
    meta?: React.ReactNode;
    actions?: React.ReactNode;
    defaultOpen?: boolean;
    className?: string;
    children: React.ReactNode;
};

const STORAGE_PREFIX = 'section:';

const readStored = (key: string, fallback: boolean): boolean => {
    try {
        const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
        if (raw === null) return fallback;
        return raw === '1';
    } catch {
        return fallback;
    }
};

const writeStored = (key: string, value: boolean) => {
    try {
        window.localStorage.setItem(STORAGE_PREFIX + key, value ? '1' : '0');
    } catch {
        /* ignore */
    }
};

export const CollapsibleSection: React.FC<Props> = ({
    id,
    title,
    meta,
    actions,
    defaultOpen = true,
    reveal = false,
    className,
    children,
}) => {
    const bodyId = useId();
    const [open, setOpen] = useState<boolean>(defaultOpen);

    useEffect(() => {
        setOpen(readStored(id, defaultOpen));
    }, [id, defaultOpen]);

    const toggle = useCallback(() => {
        setOpen(prev => {
            const next = !prev;
            writeStored(id, next);
            return next;
        });
    }, [id]);

    return (
        <section
            id={id}
            className={className ?? 'mt-14 pt-2'}
        >
            <motion.div
                className="section-rule mb-5 origin-left"
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.6, ease: EASE }}
            />
            <motion.div
                className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.5, ease: EASE }}
            >
                <button
                    type="button"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls={bodyId}
                    className="group flex flex-col items-start gap-1 text-left -mx-1 px-1 py-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
                >
                    <span className="flex items-center gap-2">
                        <h2 className="text-2xl sm:text-3xl font-bold inline-block">
                            {title}
                        </h2>
                        <FiChevronDown
                            size={18}
                            className={`shrink-0 text-[var(--muted)] transition-transform duration-300 ${open ? '' : '-rotate-90'}`}
                            aria-hidden="true"
                        />
                    </span>
                </button>
                {(meta || actions) && (
                    <div className="flex items-center gap-3">
                        {meta}
                        {actions}
                    </div>
                )}
            </motion.div>

            <div
                id={bodyId}
                aria-hidden={!open}
                {...(!open ? { inert: '' as unknown as boolean } : {})}
                className={`grid transition-[grid-template-rows] duration-[450ms] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden min-h-0 -mx-3 px-3 -mt-3 pt-3 -mb-8 pb-8">
                    {reveal ? (
                        <motion.div
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.05, margin: '0px 0px -8% 0px' }}
                            transition={{ duration: 0.6, ease: EASE }}
                        >
                            {children}
                        </motion.div>
                    ) : children}
                </div>
            </div>
        </section>
    );
};

export default CollapsibleSection;
