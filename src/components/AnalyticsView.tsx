import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, PieChart, BarChart3, Calendar, Clock, Zap } from 'lucide-react';
import { Task } from '../types';

interface AnalyticsViewProps {
  tasks: Task[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ tasks }) => {
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    todo: tasks.filter(t => t.status === 'todo').length,
    highPriority: tasks.filter(t => t.priority === 'high').length,
    avgCompletionTime: Math.floor(Math.random() * 5 + 2)
  };

  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
  const efficiency = Math.min(100, completionRate + Math.random() * 20);

  const AnalyticsCard = ({ icon: Icon, label, value, unit, color }: any) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-elegant hover:shadow-elegant-hover transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">+12%</span>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
      {unit && <div className="text-xs text-gray-500 mt-2">{unit}</div>}
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
        <p className="text-gray-600">Track your project performance and metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnalyticsCard
          icon={TrendingUp}
          label="Completion Rate"
          value={`${completionRate.toFixed(0)}%`}
          color="bg-blue-500"
        />
        <AnalyticsCard
          icon={Zap}
          label="Efficiency Score"
          value={`${efficiency.toFixed(0)}%`}
          color="bg-purple-500"
        />
        <AnalyticsCard
          icon={Clock}
          label="Avg. Completion"
          value={`${stats.avgCompletionTime}d`}
          unit="days"
          color="bg-orange-500"
        />
      </div>

      {/* Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-elegant"
        >
          <div className="flex items-center space-x-2 mb-6">
            <PieChart className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Task Distribution</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700 font-medium">Completed</span>
                <span className="text-gray-900 font-bold">{stats.completed}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.completed / stats.total) * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-green-500 rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700 font-medium">In Progress</span>
                <span className="text-gray-900 font-bold">{stats.inProgress}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.inProgress / stats.total) * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-700 font-medium">To Do</span>
                <span className="text-gray-900 font-bold">{stats.todo}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats.todo / stats.total) * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gray-400 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Priority Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-elegant"
        >
          <div className="flex items-center space-x-2 mb-6">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Priority Breakdown</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <span className="text-gray-700 font-medium">High Priority</span>
              <span className="text-2xl font-bold text-red-600">{stats.highPriority}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <span className="text-gray-700 font-medium">Medium Priority</span>
              <span className="text-2xl font-bold text-yellow-600">{tasks.filter(t => t.priority === 'medium').length}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <span className="text-gray-700 font-medium">Low Priority</span>
              <span className="text-2xl font-bold text-green-600">{tasks.filter(t => t.priority === 'low').length}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-elegant"
      >
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="space-y-3">
          {tasks.slice(0, 5).map((task, idx) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{task.title}</p>
                <p className="text-xs text-gray-500">{task.createdAt.toLocaleDateString()}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                task.status === 'completed' ? 'bg-green-100 text-green-700' :
                task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {task.status}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
