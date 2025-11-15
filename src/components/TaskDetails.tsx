import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Flag, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Task } from '../types';

interface TaskDetailsProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

const statusConfig = {
  'todo': { color: '#C9BFB0', icon: AlertCircle, label: 'To Do' },
  'in-progress': { color: '#B8A896', icon: Clock, label: 'In Progress' },
  'completed': { color: '#7A6F62', icon: CheckCircle, label: 'Completed' }
};

const priorityConfig = {
  'low': { color: '#D7D3C4', label: 'Low Priority' },
  'medium': { color: '#B8A896', label: 'Medium Priority' },
  'high': { color: '#9B8862', label: 'High Priority' }
};

export const TaskDetails: React.FC<TaskDetailsProps> = ({ 
  task, 
  isOpen, 
  onClose, 
  onStatusChange 
}) => {
  if (!task || !isOpen) return null;

  const StatusIcon = statusConfig[task.status].icon;
  const statusColor = statusConfig[task.status].color;
  const priorityColor = priorityConfig[task.priority].color;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        className="bg-white rounded-2xl p-8 w-full max-w-lg border border-beige-200 shadow-elegant-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div 
              className="p-3 rounded-xl"
              style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
            >
              <StatusIcon className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-beige-900">{task.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-beige-600 hover:text-beige-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-beige-900 mb-2">Description</h3>
            <p className="text-beige-800 text-sm leading-relaxed">
              {task.description || 'No description provided.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div 
              className="p-4 rounded-xl border"
              style={{ 
                backgroundColor: `${statusColor}10`, 
                borderColor: `${statusColor}30` 
              }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <StatusIcon className="w-4 h-4" style={{ color: statusColor }} />
                <span className="text-sm font-medium text-beige-900">Status</span>
              </div>
              <p className="text-sm font-bold" style={{ color: statusColor }}>
                {statusConfig[task.status].label}
              </p>
            </div>

            <div 
              className="p-4 rounded-xl border"
              style={{ 
                backgroundColor: `${priorityColor}10`, 
                borderColor: `${priorityColor}30` 
              }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Flag className="w-4 h-4" style={{ color: priorityColor }} />
                <span className="text-sm font-medium text-beige-900">Priority</span>
              </div>
              <p className="text-sm font-bold" style={{ color: priorityColor }}>
                {priorityConfig[task.priority].label}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm text-beige-700">
              <Calendar className="w-4 h-4" />
              <span>Created: {task.createdAt.toLocaleDateString()}</span>
            </div>
            {task.completedAt && (
              <div className="flex items-center space-x-3 text-sm text-beige-700">
                <CheckCircle className="w-4 h-4" />
                <span>Completed: {task.completedAt.toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-beige-900 mb-3">Change Status</h3>
            <div className="flex space-x-2">
              {Object.entries(statusConfig).map(([status, config]) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onStatusChange(task.id, status as Task['status'])}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    task.status === status
                      ? 'text-white'
                      : 'text-beige-700 hover:text-beige-900'
                  }`}
                  style={{
                    backgroundColor: task.status === status 
                      ? `${config.color}60` 
                      : `${config.color}20`,
                    borderColor: config.color,
                    border: '1px solid'
                  }}
                >
                  {config.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};