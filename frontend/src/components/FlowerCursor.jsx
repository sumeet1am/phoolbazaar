import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CURSOR_ICONS = ['🌸', '✨', '🍃', '💖'];

export default function FlowerCursor() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Disable on touch devices for performance
    if ('ontouchstart' in window) return;

    let idCount = 0;
    const handleMouseMove = (e) => {
      // Spawn particle sparsely
      if (Math.random() > 0.3) return;

      const newParticle = {
        id: idCount++,
        x: e.clientX,
        y: e.clientY,
        icon: CURSOR_ICONS[Math.floor(Math.random() * CURSOR_ICONS.length)],
        size: Math.floor(Math.random() * 12) + 12
      };

      setParticles((prev) => [...prev.slice(-12), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.6, x: p.x - 10, y: p.y - 10, rotate: 0 }}
            animate={{
              opacity: 0,
              scale: 1.2,
              y: p.y + 25,
              x: p.x + (Math.random() * 20 - 10),
              rotate: Math.random() * 180 - 90
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute select-none filter drop-shadow-md text-xs"
            style={{ fontSize: `${p.size}px` }}
          >
            {p.icon}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
