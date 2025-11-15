export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  completedAt?: Date;
  position: [number, number, number];
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  status: 'idle' | 'working' | 'discussing';
}

export interface AgentMessage {
  id: string;
  agentId: string;
  content: string;
  timestamp: Date;
  type: 'analysis' | 'code' | 'discussion' | 'completion';
}