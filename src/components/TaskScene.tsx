import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import { TaskCube } from './TaskCube';
import { Task } from '../types';

interface TaskSceneProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskComplete: (taskId: string) => void;
}

const SceneContent: React.FC<TaskSceneProps> = ({ tasks, onTaskClick, onTaskComplete }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#B8A896" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#D7D3C4" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        color="#F5F1E8"
      />
      
      {tasks.map((task) => (
        <TaskCube
          key={task.id}
          task={task}
          onClick={() => onTaskClick(task)}
          onComplete={() => onTaskComplete(task.id)}
        />
      ))}
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
    </>
  );
};

export const TaskScene: React.FC<TaskSceneProps> = (props) => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'radial-gradient(circle at center, #F5F1E8 0%, #EBE7DC 100%)' }}
      >
        <Suspense fallback={null}>
          <SceneContent {...props} />
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={3}
            maxDistance={15}
            enablePan={false}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
};