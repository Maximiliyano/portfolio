export type Skill = { name: string; years: number };
export type SkillGroup = { group: string; items: Skill[] };

export const skills: SkillGroup[] = [
    {
        group: 'Languages',
        items: [
            { name: 'C#', years: 4 },
            { name: 'JavaScript', years: 3 },
            { name: 'TypeScript', years: 3 },
            { name: 'SQL', years: 4 },
            { name: 'HTML5', years: 4 },
            { name: 'CSS3', years: 3 }
        ]
    },
    {
        group: 'Backend / Architecture',
        items: [
            { name: '.NET Core', years: 4 },
            { name: 'ASP.NET Web API', years: 4 },
            { name: 'CQRS', years: 2 },
            { name: 'EventStore', years: 1 }
        ]
    },
    {
        group: 'Frontend',
        items: [
            { name: 'Angular', years: 2 },
            { name: 'React', years: 2 },
            { name: 'Tailwind CSS', years: 2 }
        ]
    },
    {
        group: 'Databases',
        items: [
            { name: 'MS SQL Server', years: 4 },
            { name: 'PostgreSQL', years: 3 },
            { name: 'MongoDB', years: 2 }
        ]
    },
    {
        group: 'Tools & Testing',
        items: [
            { name: 'EF Core', years: 4 },
            { name: 'NHibernate', years: 2 },
            { name: 'Dapper', years: 2 },
            { name: 'xUnit', years: 3 },
            { name: 'NUnit', years: 2 }
        ]
    }
];

export default skills;
