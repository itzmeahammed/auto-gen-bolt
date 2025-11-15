import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle, Target, TrendingUp, Zap } from 'lucide-react';
import { Task } from '../types';

interface DashboardProps {
  tasks: Task[];
}

export const Dashboard: React.FC<DashboardProps> = ({ tasks }) => {
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    todo: tasks.filter(t => t.status === 'todo').length,
    highPriority: tasks.filter(t => t.priority === 'high').length
  };

  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  const StatCard: React.FC<{ 
    icon: React.ReactNode; 
    label: string; 
    value: number; 
    color: string;
    detail?: string;
  }> = ({ icon, label, value, color, detail }) => (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gradient-to-br from-white to-beige-50 backdrop-blur-sm rounded-xl p-4 border border-beige-200 hover:border-beige-300 transition-all duration-300 shadow-elegant hover:shadow-elegant-hover"
      style={{ 
        boxShadow: `0 4px 20px rgba(0,0,0,0.08)`,
      }}
    >
      <div className="flex items-center space-x-3">
        <div 
          className="p-3 rounded-xl"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold text-beige-900">{value}</div>
          <div className="text-sm text-beige-700">{label}</div>
          {detail && (
            <div className="text-xs text-beige-600">{detail}</div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        <StatCard
          icon={<Target className="w-5 h-5" />}
          label="Total Tasks"
          value={stats.total}
          color="#9E8F7C"
        />
        <StatCard
          icon={<CheckCircle className="w-5 h-5" />}
          label="Completed"
          value={stats.completed}
          color="#7A6F62"
          detail={`${completionRate.toFixed(0)}% done`}
        />
        <StatCard
          icon={<Clock className="w-5 h-5" />}
          label="In Progress"
          value={stats.inProgress}
          color="#B8A896"
        />
        <StatCard
          icon={<AlertCircle className="w-5 h-5" />}
          label="To Do"
          value={stats.todo}
          color="#C9BFB0"
        />
        <StatCard
          icon={<Zap className="w-5 h-5" />}
          label="High Priority"
          value={stats.highPriority}
          color="#9B8862"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Productivity"
          value={Math.round(completionRate)}
          color="#B5A07C"
          detail="% complete"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-white to-beige-50 backdrop-blur-sm rounded-xl p-6 border border-beige-200 shadow-elegant"
      >
        <h3 className="text-lg font-semibold text-beige-900 mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-beige-700" />
          <span>Progress Overview</span>
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-beige-700">Overall Completion</span>
              <span className="text-beige-800 font-medium">{completionRate.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-beige-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-beige-600 to-warm-700 rounded-full"
                style={{
                  boxShadow: '0 0 10px rgba(122, 111, 98, 0.3)'
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-beige-700">{stats.completed}</div>
              <div className="text-xs text-beige-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warm-700">{stats.inProgress}</div>
              <div className="text-xs text-beige-600">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-beige-600">{stats.todo}</div>
              <div className="text-xs text-beige-600">Pending</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};