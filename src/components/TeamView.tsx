import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Zap, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { Agent } from '../types';
import { Task } from '../types';

interface TeamViewProps {
  agents: Agent[];
  tasks: Task[];
}

export const TeamView: React.FC<TeamViewProps> = ({ agents, tasks }) => {
  const getAgentStats = () => {
    return {
      completed: Math.floor(Math.random() * 10 + 5),
      inProgress: Math.floor(Math.random() * 5 + 2),
      efficiency: Math.floor(Math.random() * 30 + 70)
    };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Team Collaboration</h2>
        <p className="text-gray-600">Monitor agent performance and collaboration metrics</p>
      </div>

      {/* Team Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-elegant"
      >
        <div className="flex items-center space-x-2 mb-6">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Active Team Members</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, idx) => {
            const stats = getAgentStats();
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold text-white"
                    style={{ backgroundColor: agent.color }}
                  >
                    {agent.avatar}
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">Active</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">{agent.name}</h4>
                <p className="text-xs text-gray-600 mb-4">{agent.role}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Tasks Completed</span>
                    <span className="font-bold text-gray-900">{stats.completed}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">In Progress</span>
                    <span className="font-bold text-gray-900">{stats.inProgress}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Efficiency</span>
                    <span className="font-bold text-blue-600">{stats.efficiency}%</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-elegant"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Award className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
          </div>
          <div className="space-y-3">
            {agents.slice(0, 3).map((agent, idx) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-lg font-bold text-yellow-600">#{idx + 1}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{agent.name}</p>
                    <p className="text-xs text-gray-500">{agent.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{85 - idx * 5}%</p>
                  <p className="text-xs text-gray-500">efficiency</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Communication Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-elegant"
        >
          <div className="flex items-center space-x-2 mb-6">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Communication</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Total Messages</span>
                <span className="text-2xl font-bold text-blue-600">247</span>
              </div>
              <p className="text-xs text-gray-600">+15% from last week</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Avg Response Time</span>
                <span className="text-2xl font-bold text-purple-600">2.3m</span>
              </div>
              <p className="text-xs text-gray-600">Excellent collaboration</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Task Assignments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-elegant"
      >
        <div className="flex items-center space-x-2 mb-6">
          <Zap className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">Task Assignments</h3>
        </div>
        <div className="space-y-3">
          {tasks.slice(0, 4).map((task, idx) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{task.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {task.status === 'completed' && '✓ Completed'} 
                  {task.status === 'in-progress' && '⏱ In Progress'}
                  {task.status === 'todo' && '○ To Do'}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {task.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                {task.status === 'in-progress' && <Clock className="w-5 h-5 text-blue-600" />}
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-700' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {task.priority}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
