export type Skill = { name: string; level?: number };
export type SkillGroup = { group: string; items: Skill[] };

export const skills: SkillGroup[] = [
    {
        group: 'Languages',
        items: [
            { name: 'C#', level: 90 },
            { name: 'JavaScript', level: 80 },
            { name: 'TypeScript', level: 75 },
            { name: 'SQL', level: 80 },
            { name: 'HTML5', level: 85 },
            { name: 'CSS3', level: 75 }
        ]
    },
    {
        group: 'Backend / Architecture',
        items: [
            { name: '.NET Core', level: 90 },
            { name: 'ASP.NET Web API', level: 85 },
            { name: 'CQRS', level: 70 },
            { name: 'EventStore', level: 65 }
        ]
    },
    {
        group: 'Frontend',
        items: [
            { name: 'Angular', level: 70 },
            { name: 'React', level: 75 },
            { name: 'Tailwind CSS', level: 70 }
        ]
    },
    {
        group: 'Databases',
        items: [
            { name: 'MS SQL Server', level: 85 },
            { name: 'PostgreSQL', level: 75 },
            { name: 'MongoDB', level: 65 }
        ]
    },
    {
        group: 'Tools & Testing',
        items: [
            { name: 'EF Core', level: 80 },
            { name: 'Dapper', level: 70 },
            { name: 'xUnit', level: 75 },
            { name: 'NUnit', level: 70 }
        ]
    }
];

export default skills;
