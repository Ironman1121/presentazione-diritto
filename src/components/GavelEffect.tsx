import React from 'react';
import { motion } from 'motion/react';
import { Gavel } from 'lucide-react';

export function GavelEffect({ trigger }: { trigger: any }) {
  return (
    <motion.div
      key={trigger}
      initial={{ opacity: 0, scale: 2, rotate: -45 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [2, 1, 1.2],
        rotate: [-45, 0, 0]
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-0 pointer-events-none z-[200] flex items-center justify-center overflow-hidden"
    >
      <div className="relative">
        <Gavel size={200} className="text-gold/20" />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 4], opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gold/20 rounded-full blur-3xl"
        />
      </div>
    </motion.div>
  );
}
