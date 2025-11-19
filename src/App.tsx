import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, BarChart3, Cpu, Sparkles, Users, TrendingUp, LogOut } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { TaskScene } from './components/TaskScene';
import { AgentPanel } from './components/AgentPanel';
import { Dashboard } from './components/Dashboard';
import { TaskForm } from './components/TaskForm';
import { TaskDetails } from './components/TaskDetails';
import { AnalyticsView } from './components/AnalyticsView';
import { TeamView } from './components/TeamView';
import { useTaskManager } from './hooks/useTaskManager';
import { useAgentSimulation } from './hooks/useAgentSimulation';
import { Task } from './types';

function App() {
  const { user, logout } = useAuth();
  const { tasks, addTask, updateTask } = useTaskManager();
  const { messages, isActive, startSimulation, clearMessages, agents } = useAgentSimulation();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [activeView, setActiveView] = useState<'3d' | 'dashboard' | 'agents' | 'analytics' | 'team'>('3d');

  const handleTaskStatusChange = (taskId: string, status: Task['status']) => {
    updateTask(taskId, { status });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-gray-200 backdrop-blur-md bg-white sticky top-0 z-40 shadow-elegant"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 bg-gradient-to-r from-beige-600 to-warm-700 rounded-xl flex items-center justify-center shadow-elegant"
              >
                <Cpu className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  TaskFlow Pro
                </h1>
                <p className="text-xs text-gray-600">Elegant Task Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 px-4 py-2 bg-amber-50 rounded-xl border border-amber-200">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{user?.fullName.charAt(0).toUpperCase()}</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">{user?.fullName}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
              </div>

              <div className="flex bg-white rounded-xl p-1.5 shadow-elegant border border-gray-200">
                <button
                  onClick={() => setActiveView('3d')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeView === '3d'
                      ? 'bg-gray-100 text-gray-900 shadow-elegant'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  3D View
                </button>
                <button
                  onClick={() => setActiveView('dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1 ${
                    activeView === 'dashboard'
                      ? 'bg-gray-100 text-gray-900 shadow-elegant'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveView('agents')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1 ${
                    activeView === 'agents'
                      ? 'bg-gray-100 text-gray-900 shadow-elegant'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span>Agents</span>
                </button>
                <button
                  onClick={() => setActiveView('analytics')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1 ${
                    activeView === 'analytics'
                      ? 'bg-gray-100 text-gray-900 shadow-elegant'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Analytics</span>
                </button>
                <button
                  onClick={() => setActiveView('team')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1 ${
                    activeView === 'team'
                      ? 'bg-gray-100 text-gray-900 shadow-elegant'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Team</span>
                </button>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsTaskFormOpen(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-beige-700 to-warm-800 text-white rounded-xl font-medium flex items-center space-x-2 hover:shadow-elegant-hover transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Task</span>
                <Sparkles className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl font-medium flex items-center space-x-2 hover:bg-red-100 transition-all border border-red-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-elegant-lg"
          style={{ minHeight: 'calc(100vh - 200px)' }}
        >
          {activeView === '3d' && (
            <TaskScene
              tasks={tasks}
              onTaskClick={setSelectedTask}
              onTaskComplete={(taskId) => handleTaskStatusChange(taskId, 'completed')}
            />
          )}
          
          {activeView === 'dashboard' && (
            <div className="p-8 h-full overflow-y-auto">
              <Dashboard tasks={tasks} />
            </div>
          )}
          
          {activeView === 'agents' && (
            <div className="p-8 h-full overflow-y-auto">
              <AgentPanel
                agents={agents}
                messages={messages}
                isActive={isActive}
                onStartSimulation={startSimulation}
                onClearMessages={clearMessages}
              />
            </div>
          )}
          
          {activeView === 'analytics' && (
            <div className="p-8 h-full overflow-y-auto">
              <AnalyticsView tasks={tasks} />
            </div>
          )}
          
          {activeView === 'team' && (
            <div className="p-8 h-full overflow-y-auto">
              <TeamView agents={agents} tasks={tasks} />
            </div>
          )}
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence mode="wait">
        {isTaskFormOpen && (
          <TaskForm
            key="task-form"
            isOpen={isTaskFormOpen}
            onClose={() => setIsTaskFormOpen(false)}
            onSubmit={addTask}
          />
        )}
        
        {selectedTask && (
          <TaskDetails
            key={`task-details-${selectedTask.id}`}
            task={selectedTask}
            isOpen={!!selectedTask}
            onClose={() => setSelectedTask(null)}
            onStatusChange={handleTaskStatusChange}
          />
        )}
      </AnimatePresence>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100/5 via-transparent to-gray-100/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-200/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-200/3 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

export default App;