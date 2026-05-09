import React, { useCallback, useEffect, useId, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

type Props = {
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
            className={className ?? 'mt-4 py-4 border-b border-gray-200 dark:border-slate-700'}
        >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
                <button
                    type="button"
                    onClick={toggle}
                    aria-expanded={open}
                    aria-controls={bodyId}
                    className="group flex items-center gap-2 text-left -mx-1 px-1 py-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
                >
                    <h2 className="text-2xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent inline-block">
                        {title}
                    </h2>
                    <FiChevronDown
                        size={18}
                        className={`shrink-0 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
                        aria-hidden="true"
                    />
                </button>
                {(meta || actions) && (
                    <div className="flex items-center gap-3">
                        {meta}
                        {actions}
                    </div>
                )}
            </div>

            <div
                id={bodyId}
                aria-hidden={!open}
                {...(!open ? { inert: '' as unknown as boolean } : {})}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden min-h-0">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default CollapsibleSection;
