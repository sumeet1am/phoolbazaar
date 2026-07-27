import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const PETAL_TYPES = ['🌸', '🌺', '🌼', '🍃', '✨', '🌹', '🌷'];

export default function FallingPetals() {
  // Generate a set of floating particles
  const petals = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      icon: PETAL_TYPES[i % PETAL_TYPES.length],
      left: Math.random() * 100, // % position
      size: Math.floor(Math.random() * 16) + 14, // 14px to 30px
      duration: Math.random() * 8 + 8, // 8s to 16s fall duration
      delay: Math.random() * 6,
      rotateEnd: Math.random() * 360 + 180,
      swayWidth: Math.random() * 60 - 30
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute opacity-80 filter drop-shadow-sm select-none"
          style={{
            left: `${petal.left}%`,
            fontSize: `${petal.size}px`
          }}
          initial={{
            y: -40,
            x: 0,
            opacity: 0,
            rotate: 0
          }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, petal.swayWidth, 0, -petal.swayWidth, 0],
            rotate: [0, petal.rotateEnd],
            opacity: [0, 0.85, 0.85, 0]
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: petal.delay
          }}
        >
          {petal.icon}
        </motion.div>
      ))}
    </div>
  );
}
