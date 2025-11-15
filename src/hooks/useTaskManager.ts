import { useState, useEffect } from 'react';
import { Task } from '../types';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('autodev-tasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined
      }));
      setTasks(parsedTasks);
    } else {
      // Initialize with sample tasks
      const initialTasks: Task[] = [
        {
          id: '1',
          title: 'Setup 3D Environment',
          description: 'Initialize Three.js scene with camera and lighting',
          status: 'completed',
          priority: 'high',
          createdAt: new Date(Date.now() - 86400000),
          completedAt: new Date(Date.now() - 43200000),
          position: [-2, 1, 0]
        },
        {
          id: '2',
          title: 'Implement Task CRUD',
          description: 'Create, read, update, delete operations for tasks',
          status: 'in-progress',
          priority: 'high',
          createdAt: new Date(Date.now() - 43200000),
          position: [0, 1, 0]
        },
        {
          id: '3',
          title: 'Design Authentication UI',
          description: 'Create login and signup forms with validation',
          status: 'todo',
          priority: 'medium',
          createdAt: new Date(),
          position: [2, 1, 0]
        }
      ];
      setTasks(initialTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('autodev-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'position'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      position: [Math.random() * 4 - 2, Math.random() * 2 + 1, Math.random() * 2 - 1]
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, completedAt: updates.status === 'completed' ? new Date() : task.completedAt }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask
  };
};