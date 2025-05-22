'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export const AnimatedCard = ({
  children,
  animationKey,
  shouldSnapIn = false,
}: {
  children: ReactNode;
  animationKey: string;
  shouldSnapIn?: boolean;
}) => {
  const duration = shouldSnapIn ? 0.3 : 1.2;
  const yOffset = shouldSnapIn ? 8 : 20;

  return (
    <motion.div
      key={animationKey}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        duration,
        bounce: 0.3,
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
};