import { useMemo } from 'react';
import skills, { type Skill } from '../../data/skills';
import SkillGroup from '../skills/SkillGroup';
import { Container } from '../layout/Container';

export const SkillsSection = () => {
    const groups = useMemo(() => skills.map((g: { group: string; items: Skill[] }) => (
        <div key={g.group}>
            <SkillGroup group={g.group} items={g.items} />
        </div>
    )), []);

    return (
        <Container id="skills" className="mt-4 py-4 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">{groups}</div>
        </Container>
    );
};
