export type Skill = { name: string; years: number };
export type SkillGroup = { group: string; items: Skill[] };

export const skills: SkillGroup[] = [
    {
        group: 'Languages',
        items: [
            { name: 'C#', years: 5 },
            { name: 'JavaScript', years: 4 },
            { name: 'TypeScript', years: 4 },
            { name: 'SQL', years: 5 },
            { name: 'HTML5', years: 5 },
            { name: 'CSS3', years: 4 }
        ]
    },
    {
        group: 'Backend / Architecture',
        items: [
            { name: '.NET Core', years: 5 },
            { name: 'ASP.NET Web API', years: 5 },
            { name: 'CQRS', years: 3 },
            { name: 'EventStore', years: 2 }
        ]
    },
    {
        group: 'Frontend',
        items: [
            { name: 'Angular', years: 4 },
            { name: 'React', years: 4 },
            { name: 'Tailwind CSS', years: 4 }
        ]
    },
    {
        group: 'Databases',
        items: [
            { name: 'MS SQL Server', years: 5 },
            { name: 'PostgreSQL', years: 3 },
            { name: 'MongoDB', years: 3 }
        ]
    },
    {
        group: 'Tools & Testing',
        items: [
            { name: 'EF Core', years: 5 },
            { name: 'NHibernate', years: 3 },
            { name: 'Dapper', years: 3 },
            { name: 'xUnit', years: 4 },
            { name: 'NUnit', years: 3 }
        ]
    }
];

export default skills;
