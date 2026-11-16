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
                <div className="flex items-center gap-3 text-xs font-mono text-[var(--muted)]">
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
                        className="font-mono text-xs text-[var(--accent)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded"
                    >
                        Clear filter
                    </button>
                ) : null
            }
        >
            <p className="text-sm text-[var(--muted)] mb-3">
                Pick one or more to filter the projects above.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {domains.map(d => {
                    const checked = selected.has(d.id);
                    const count = counts[d.id] ?? 0;
                    const isAi = d.id === 'ai-ml';
                    return (
                        <label
                            key={d.id}
                            className={`glass glass-hover lift-hover flex items-start gap-3 p-3 rounded-full sm:rounded-2xl cursor-pointer focus-within:ring-2 focus-within:ring-teal-400 ${
                                checked
                                    ? 'border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)]'
                                    : isAi
                                        ? 'border-[color-mix(in_srgb,var(--accent)_45%,transparent)]'
                                        : ''
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
                                <span className={`flex items-center gap-2 text-sm font-medium ${isAi ? 'text-[var(--accent)]' : ''}`}>
                                    {d.label}
                                    <span className="text-xs text-[var(--muted)]">({count})</span>
                                </span>
                                <span className="text-xs text-[var(--muted)]">{d.description}</span>
                            </span>
                        </label>
                    );
                })}
            </div>
        </CollapsibleSection>
    );
};

export default DomainsSection;
