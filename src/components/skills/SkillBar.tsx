import React from 'react';

type Props = { name: string; years: number; maxYears?: number };

export const SkillBar: React.FC<Props> = ({ name, years, maxYears = 5 }) => {
    const pct = Math.max(8, Math.min(100, Math.round((years / Math.max(maxYears, 1)) * 100)));

    return (
        <div className="py-1">
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{name}</span>
                <span className="text-xs text-[var(--muted)] tabular-nums">
                    {years} {years === 1 ? 'yr' : 'yrs'}
                </span>
            </div>
            <div className="h-1 rounded-full bg-[var(--border)] overflow-hidden" aria-hidden="true">
                <div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
};

export default SkillBar;
