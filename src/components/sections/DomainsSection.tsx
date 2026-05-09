import React, { useMemo } from 'react';
import { CollapsibleSection } from '../layout/CollapsibleSection';
import { domains, type DomainId } from '../../data/domains';
import projects from '../../data/projects';

type Props = {
    selected: Set<DomainId>;
    onToggle: (id: DomainId) => void;
    onClear: () => void;
};

export const DomainsSection: React.FC<Props> = ({ selected, onToggle, onClear }) => {
    const counts = useMemo(() => {
        const acc: Record<string, number> = {};
        for (const p of projects) {
            for (const d of p.domains) acc[d] = (acc[d] ?? 0) + 1;
        }
        return acc;
    }, []);

    const hasSelection = selected.size > 0;

    return (
        <CollapsibleSection
            id="domains"
            title="Domains of Expertise"
            meta={
                <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                    <span>{domains.length} domains</span>
                    {hasSelection && (
                        <>
                            <span>·</span>
                            <span>{selected.size} selected</span>
                        </>
                    )}
                </div>
            }
            actions={
                hasSelection ? (
                    <button
                        type="button"
                        onClick={onClear}
                        className="text-xs text-teal-600 dark:text-teal-400 hover:underline"
                    >
                        Clear filter
                    </button>
                ) : null
            }
        >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Pick one or more to filter the projects above.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {domains.map(d => {
                    const checked = selected.has(d.id);
                    const count = counts[d.id] ?? 0;
                    return (
                        <label
                            key={d.id}
                            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                                checked
                                    ? 'border-teal-400 bg-teal-50 dark:bg-teal-900/20 dark:border-teal-700'
                                    : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/60'
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => onToggle(d.id)}
                                className="mt-0.5 w-4 h-4 rounded accent-teal-500 cursor-pointer"
                                aria-label={d.label}
                            />
                            <span className="flex-1">
                                <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {d.label}
                                    <span className="text-xs text-gray-500 dark:text-gray-400">({count})</span>
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{d.description}</span>
                            </span>
                        </label>
                    );
                })}
            </div>
        </CollapsibleSection>
    );
};

export default DomainsSection;
