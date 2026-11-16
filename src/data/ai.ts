export type AiCapability = {
    id: string;
    title: string;
    blurb: string;
    evidence: string;
    tags: string[];
    projectId?: string;
};

export const aiCapabilities: AiCapability[] = [
    {
        id: 'agents',
        title: 'LLM agents and orchestration',
        blurb: 'Multi-agent workflows that plan, call tools and hand work between specialised agents.',
        evidence: 'AI Agents Platform at DataArt: agent orchestration for investment workflows.',
        tags: ['Semantic Kernel', 'Multi-agent', 'Workflows'],
        projectId: 'ai-agents-platform',
    },
    {
        id: 'mcp',
        title: 'Model Context Protocol',
        blurb: 'MCP servers and tool integrations that give models safe access to real systems.',
        evidence: 'MCP-based pipelines on the AI Agents Platform.',
        tags: ['MCP', 'Tool calling'],
        projectId: 'ai-agents-platform',
    },
    {
        id: 'assist',
        title: 'AI-assisted engineering',
        blurb: 'Skills, plugins, subagents and MCP integrations woven into everyday delivery.',
        evidence: 'Daily use of Claude on enterprise teams at Coherent and EPAM.',
        tags: ['Claude', 'Skills', 'Subagents'],
        projectId: 'transport-and-schedule-system',
    },
    {
        id: 'backend',
        title: 'Agent-ready backends',
        blurb: 'Distributed, observable .NET services that agents can actually run on.',
        evidence: '.NET Aspire and Microsoft Orleans behind the agent platform.',
        tags: ['.NET Aspire', 'Orleans', 'Clean Architecture'],
        projectId: 'ai-agents-platform',
    },
    {
        id: 'prompt',
        title: 'Prompt and context engineering',
        blurb: 'Structured prompts, tool schemas and context shaping that keep agents reliable.',
        evidence: 'Applied across agent workflows and AI-driven development.',
        tags: ['Prompting', 'Context', 'Evaluation'],
    },
];
