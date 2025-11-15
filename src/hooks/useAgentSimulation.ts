import { useState, useEffect } from 'react';
import { AgentMessage } from '../types';
import { agents } from '../data/agents';

const simulationMessages = [
  {
    agentId: 'pm',
    content: 'Analyzing requirements for the futuristic task manager. Breaking down into 6 core modules: UI/UX, 3D rendering, authentication, API design, testing, and documentation.',
    type: 'analysis' as const,
    delay: 1000
  },
  {
    agentId: 'research',
    content: 'Recommending Three.js with @react-three/fiber for 3D components. GSAP for animations. WebGL shaders for neon effects. Performance target: 60fps on mid-range devices.',
    type: 'analysis' as const,
    delay: 2000
  },
  {
    agentId: 'frontend',
    content: 'Implementing 3D task cubes with hover animations. Using React Suspense for lazy loading. Component architecture: TaskCube, Scene, Dashboard, AgentPanel.',
    type: 'code' as const,
    delay: 3000
  },
  {
    agentId: 'backend',
    content: 'RESTful API design: /api/tasks (CRUD), /api/auth (JWT), /api/users. MongoDB schema with indexing on status and priority fields for optimal queries.',
    type: 'code' as const,
    delay: 4000
  },
  {
    agentId: 'qa',
    content: 'Test suite includes: Unit tests for task operations, Integration tests for API endpoints, E2E tests for 3D interactions. Coverage target: 90%+',
    type: 'analysis' as const,
    delay: 5000
  },
  {
    agentId: 'docs',
    content: 'Documentation structure: README.md, API.md, DEPLOYMENT.md, ARCHITECTURE.md. Including setup instructions, tech stack overview, and contribution guidelines.',
    type: 'completion' as const,
    delay: 6000
  },
  {
    agentId: 'pm',
    content: 'All agents reporting progress. Estimated completion: Frontend 85%, Backend 70%, Testing 60%, Documentation 80%. Prioritizing core 3D functionality.',
    type: 'discussion' as const,
    delay: 7000
  }
];

export const useAgentSimulation = () => {
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isActive, setIsActive] = useState(false);

  const startSimulation = () => {
    setIsActive(true);
    setMessages([]);
    
    simulationMessages.forEach((msg, index) => {
      setTimeout(() => {
        const newMessage: AgentMessage = {
          id: `${msg.agentId}-${Date.now()}-${index}`,
          agentId: msg.agentId,
          content: msg.content,
          type: msg.type,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
        
        if (index === simulationMessages.length - 1) {
          setTimeout(() => setIsActive(false), 2000);
        }
      }, msg.delay);
    });
  };

  const clearMessages = () => {
    setMessages([]);
    setIsActive(false);
  };

  return {
    messages,
    isActive,
    startSimulation,
    clearMessages,
    agents
  };
};