import { useMemo } from 'react';
import skills from '../../data/skills';
import SkillGroup from '../skills/SkillGroup';
import { Container } from '../layout/Container';

export const SkillsSection = () => {
    const groups = useMemo(() => skills.map((g: { group: string; items: any[] }) => (
        <div key={g.group}>
            <SkillGroup group={g.group} items={g.items} />
        </div>
    )), []);

    return (
        <Container id="skills" className="mt-8">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">{groups}</div>
        </Container>
    );
};
