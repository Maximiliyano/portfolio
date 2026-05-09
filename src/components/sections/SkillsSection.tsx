import { useMemo } from 'react';
import skills, { type Skill } from '../../data/skills';
import SkillGroup from '../skills/SkillGroup';
import { CollapsibleSection } from '../layout/CollapsibleSection';

export const SkillsSection = () => {
    const totalSkills = skills.reduce((s, g) => s + g.items.length, 0);
    const topSkills = useMemo(() => {
        return skills
            .flatMap(g => g.items)
            .sort((a, b) => b.years - a.years)
            .slice(0, 5);
    }, []);

    const groups = useMemo(() => skills.map((g: { group: string; items: Skill[] }) => (
        <div key={g.group}>
            <SkillGroup group={g.group} items={g.items} />
        </div>
    )), []);

    return (
        <CollapsibleSection
            id="skills"
            title="Skills"
            meta={
                <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                    <span>{skills.length} categories</span>
                    <span>&middot;</span>
                    <span>{totalSkills} technologies</span>
                </div>
            }
        >
            <div className="flex flex-wrap gap-1.5 mb-4">
                {topSkills.map(s => (
                    <span key={s.name} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
                        {s.name}
                        <span className="text-teal-500 dark:text-teal-400">{s.years}yr{s.years !== 1 ? 's' : ''}</span>
                    </span>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{groups}</div>
        </CollapsibleSection>
    );
};
