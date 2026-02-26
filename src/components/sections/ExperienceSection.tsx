import { useMemo } from 'react';
import experience, { type ExperienceItem } from '../../data/experience';
import { Container } from '../layout/Container';

export const ExperienceSection = () => {
    const nodes = useMemo(() => experience.map((it: ExperienceItem) => (
        <article
            key={`${it.company}-${it.start}`}
            className="mb-4 border border-gray-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex items-center gap-2 mb-1">
                {it.companyLogo && (
                    <img src={it.companyLogo} alt={it.company} className="w-6 h-6 rounded-full" />
                )}
                <h4 className="font-semibold">{it.company}</h4>
                {it.location && (
                    <span className="ml-auto text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                        {it.location}
                    </span>
                )}
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{it.role}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                {it.start}{it.end ? ` — ${it.end}` : ''}
            </p>
            {it.bullets.length > 0 && (
                <ul className="space-y-1">
                    {it.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <span className="text-indigo-400 flex-shrink-0 mt-0.5">›</span>
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
    )), []);

    return (
        <Container id="experience" className="mt-4 py-4 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-2xl font-semibold">Experience</h2>
            <div className="mt-4">{nodes}</div>
        </Container>
    );
};
