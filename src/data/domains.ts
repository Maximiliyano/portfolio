export type DomainId =
    | 'fintech'
    | 'transportation'
    | 'maritime'
    | 'ai-ml'
    | 'security-iot'
    | 'hr-enterprise';

export type Domain = {
    id: DomainId;
    label: string;
    short: string;
    description: string;
};

export const domains: Domain[] = [
    {
        id: 'fintech',
        label: 'FinTech / Investment',
        short: 'FinTech',
        description: 'Private equity, asset management, investment workflows',
    },
    {
        id: 'transportation',
        label: 'Transportation & Mobility',
        short: 'Transport',
        description: 'Public transport, scheduling, route planning',
    },
    {
        id: 'maritime',
        label: 'Maritime / Offshore',
        short: 'Maritime',
        description: 'Vessel traffic, offshore operations, port management',
    },
    {
        id: 'ai-ml',
        label: 'AI / Machine Learning',
        short: 'AI / ML',
        description: 'LLM agents, semantic kernel, MCP-based pipelines',
    },
    {
        id: 'security-iot',
        label: 'Security & Surveillance / IoT',
        short: 'Security / IoT',
        description: 'Camera networks, real-time monitoring',
    },
    {
        id: 'hr-enterprise',
        label: 'HR / Enterprise Tools',
        short: 'HR / Enterprise',
        description: 'Performance reviews, internal platforms',
    },
];

export const domainById = (id: DomainId): Domain | undefined =>
    domains.find(d => d.id === id);

export default domains;
