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
                key={`${it.company}-${it.start}`}
                className="mb-4 border border-gray-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {it.companyLogo && (
                        <img src={it.companyLogo} alt={it.company} className="w-6 h-6 rounded-full" />
                    )}
                    <h4 className="font-semibold">{it.company}</h4>
                    <div className="ml-auto flex items-center gap-1.5">
                        {locationText && (
                            <span className="text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded-full inline-flex items-center gap-1.5">
                                {it.country && <Flag code={it.country} size="sm" />}
                                <span>{locationText}</span>
                            </span>
                        )}
                        {it.location && (
                            <span className="text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                                {it.location}
                            </span>
                        )}
                    </div>
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{it.role}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                    {formatPeriod(it.start, it.end)}
                </p>
                {it.bullets.length > 0 && (
                    <ul className="space-y-1">
                        {it.bullets.map((b, i) => (
                            <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <span className="text-teal-400 shrink-0 mt-0.5">›</span>
                                {b}
                            </li>
                        ))}
                    </ul>
                )}
                {it.tech && it.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                        {it.tech.map(t => (
                            <span key={t} className="px-2 py-0.5 text-xs rounded border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-700/50">
                                {t}
                            </span>
                        ))}
                    </div>
                )}
            </article>
        );
    }), []);

    return (
        <CollapsibleSection
            id="experience"
            title="Experience"
            meta={
                <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                    <span>{experience.length} {experience.length === 1 ? 'company' : 'companies'}</span>
                    <span>·</span>
                    <span>{totalLabel} total</span>
                </div>
            }
        >
            {nodes}
        </CollapsibleSection>
    );
};
