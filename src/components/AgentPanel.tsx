import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Agent, AgentMessage } from '../types';
import { Bot, Play, Square, Trash2 } from 'lucide-react';

interface AgentPanelProps {
  agents: Agent[];
  messages: AgentMessage[];
  isActive: boolean;
  onStartSimulation: () => void;
  onClearMessages: () => void;
}

const AgentAvatar: React.FC<{ agent: Agent; isActive: boolean }> = ({ agent, isActive }) => (
  <motion.div
    className="relative"
    animate={{ 
      scale: isActive ? [1, 1.1, 1] : 1,
      boxShadow: isActive 
        ? `0 0 20px ${agent.color}40, 0 0 40px ${agent.color}20`
        : `0 0 10px ${agent.color}20`
    }}
    transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
  >
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
      style={{ 
        background: `linear-gradient(135deg, ${agent.color}40, ${agent.color}60)`,
        border: `2px solid ${agent.color}`
      }}
    >
      {agent.avatar}
    </div>
    {isActive && (
      <motion.div
        className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
    )}
  </motion.div>
);

const MessageBubble: React.FC<{ message: AgentMessage; agent: Agent }> = ({ message, agent }) => (
  <motion.div
    initial={{ opacity: 0, x: -20, scale: 0.9 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: 20, scale: 0.9 }}
    className="flex items-start space-x-3 mb-4"
  >
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
      style={{ 
        background: `linear-gradient(135deg, ${agent.color}40, ${agent.color}60)`,
        border: `1px solid ${agent.color}`
      }}
    >
      {agent.avatar}
    </div>
    <div className="flex-1">
      <div className="flex items-center space-x-2 mb-1">
        <span className="text-sm font-medium" style={{ color: agent.color }}>
          [{agent.role}]
        </span>
        <span className="text-xs text-gray-400">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
      <div 
        className="text-sm p-3 rounded-lg backdrop-blur-sm border"
        style={{ 
          backgroundColor: `${agent.color}10`,
          borderColor: `${agent.color}30`
        }}
      >
        {message.content}
      </div>
    </div>
  </motion.div>
);

export const AgentPanel: React.FC<AgentPanelProps> = ({
  agents,
  messages,
  isActive,
  onStartSimulation,
  onClearMessages
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-beige-200 p-6 h-full shadow-elegant-lg flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-beige-900 flex items-center space-x-2">
          <Bot className="w-6 h-6 text-beige-700" />
          <span>Agent Squad</span>
        </h2>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartSimulation}
            disabled={isActive}
            className="px-3 py-2 bg-gradient-to-r from-beige-600 to-warm-700 text-white rounded-lg disabled:opacity-50 flex items-center space-x-1 text-sm font-medium"
          >
            {isActive ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'Running' : 'Start'}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClearMessages}
            className="px-3 py-2 bg-gradient-to-r from-warm-600 to-beige-700 text-white rounded-lg flex items-center space-x-1 text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear</span>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {agents.map((agent) => (
          <div key={agent.id} className="text-center">
            <AgentAvatar 
              agent={agent} 
              isActive={isActive && messages.some(m => m.agentId === agent.id)} 
            />
            <div className="mt-2">
              <div className="text-xs text-beige-900 font-medium">{agent.name}</div>
              <div className="text-xs text-beige-600">{agent.role}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-beige-200 pt-4 flex-1 flex flex-col">
        <h3 className="text-sm font-semibold text-beige-900 mb-3">Collaboration Feed</h3>
        <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-beige-300/50">
          <AnimatePresence>
            {messages.map((message) => {
              const agent = agents.find(a => a.id === message.agentId);
              return agent ? (
                <MessageBubble key={message.id} message={message} agent={agent} />
              ) : null;
            })}
          </AnimatePresence>
          {messages.length === 0 && !isActive && (
            <div className="text-center text-beige-600 py-8">
              <Bot className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Click "Start" to begin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};