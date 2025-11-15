import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh, Color } from 'three';
import { motion } from 'framer-motion-3d';
import { Task } from '../types';

interface TaskCubeProps {
  task: Task;
  onClick: () => void;
  onComplete: () => void;
}

const statusColors = {
  'todo': '#FF6B9D',
  'in-progress': '#FFB800',
  'completed': '#00FF94'
};

const priorityIntensity = {
  'low': 0.3,
  'medium': 0.6,
  'high': 1.0
};

export const TaskCube: React.FC<TaskCubeProps> = ({ task, onClick, onComplete }) => {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  
  const baseColor = statusColors[task.status];
  const intensity = priorityIntensity[task.priority];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <motion.group
      position={task.position}
      whileHover={{ scale: 1.2 }}
      animate={{ 
        y: task.position[1] + Math.sin(Date.now() * 0.001) * 0.1,
        rotateY: hovered ? Math.PI * 0.25 : 0
      }}
    >
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={new Color(baseColor).multiplyScalar(intensity)}
          emissive={new Color(baseColor).multiplyScalar(0.2)}
          transparent
          opacity={hovered ? 0.9 : 0.7}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.2}
        color={baseColor}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {task.title}
      </Text>
      
      <Text
        position={[0, -1.1, 0]}
        fontSize={0.1}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        opacity={0.7}
      >
        {task.status.toUpperCase()} • {task.priority.toUpperCase()}
      </Text>
    </motion.group>
  );
};