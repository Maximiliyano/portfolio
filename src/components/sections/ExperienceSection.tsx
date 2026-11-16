import { useMemo } from 'react';
import experience, { type ExperienceItem } from '../../data/experience';
import { CollapsibleSection } from '../layout/CollapsibleSection';
import { formatPeriod, formatYearsMonths, rangeFrom, totalMonths } from '../../lib/dateMath';
import { countryName } from '../../lib/countryFlag';
import { Flag } from '../ui/Flag';

export const ExperienceSection = () => {
    const totalLabel = useMemo(() => {
        const ranges = experience.map(it => rangeFrom(it.start, it.end));
        return formatYearsMonths(totalMonths(ranges));
    }, []);

    const nodes = useMemo(() => experience.map((it: ExperienceItem) => {
        const locationParts = [it.city, it.country ? countryName(it.country) : null].filter(Boolean);
        const locationText = locationParts.join(', ');

        return (
            <article
                key={`${it.company.name}-${it.start}`}
                className="relative pl-8 pb-6 last:pb-0"
            >
                <span
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-[var(--accent)] ring-4 ring-[color-mix(in_srgb,var(--accent)_25%,transparent)] shadow-[0_0_16px_var(--accent)]"
                />
                <div className="glass glass-hover lift-hover rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {it.company.logo && (
                            <img src={it.company.logo} alt={it.company.name} className="w-6 h-6 rounded-full" />
                        )}
                        <h4 className="font-display font-semibold">{it.company.name}</h4>
                        <div className="ml-auto flex items-center gap-1.5 flex-wrap">
                            {locationText && (
                                <span className="chip gap-1.5">
                                    {it.country && <Flag code={it.country} size="sm" />}
                                    <span>{locationText}</span>
                                </span>
                            )}
                            {it.location && (
                                <span className="chip !text-[var(--accent)] !border-[color-mix(in_srgb,var(--accent)_40%,transparent)]">
                                    {it.location}
                                </span>
                            )}
                        </div>
                    </div>
                    <p className="text-sm font-medium">{it.role}</p>
                    <p className="font-mono text-xs text-[var(--muted)] mb-2">
                        {formatPeriod(it.start, it.end)}
                    </p>
                    {it.bullets.length > 0 && (
                        <ul className="space-y-1">
                            {it.bullets.map((b, i) => (
                                <li key={i} className="flex gap-2 text-sm text-[var(--muted)]">
                                    <span className="text-[var(--accent)] shrink-0 mt-0.5">›</span>
                                    {b}
                                </li>
                            ))}
                        </ul>
                    )}
                    {it.tech && it.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {it.tech.map(t => (
                                <span key={t} className="chip">
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </article>
        );
    }), []);

    return (
        <CollapsibleSection
            id="experience"
            title="Experience"
            meta={
                <div className="flex items-center gap-3 text-xs font-mono text-[var(--muted)]">
                    <span>{experience.length} {experience.length === 1 ? 'company' : 'companies'}</span>
                    <span>·</span>
                    <span>{totalLabel} total</span>
                </div>
            }
        >
            <div className="relative px-1 pb-2">
                <span
                    aria-hidden="true"
                    className="absolute left-[0.4rem] top-3 bottom-3 w-px bg-[var(--border-strong)]"
                />
                {nodes}
            </div>
        </CollapsibleSection>
    );
};
