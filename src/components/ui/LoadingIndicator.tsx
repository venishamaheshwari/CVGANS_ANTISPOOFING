import React from 'react';
import { motion } from 'framer-motion';

interface LoadingIndicatorProps {
  size?: number;
  color?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  size = 40, 
  color = '#4f46e5' 
}) => {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        className="flex"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 50 50"
          style={{ overflow: 'visible' }}
        >
          <motion.circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
            stroke={color}
            strokeLinecap="round"
            initial={{ pathLength: 0.2, opacity: 0.2 }}
            animate={{ 
              pathLength: [0.2, 0.8, 0.2],
              opacity: [0.2, 1, 0.2]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default LoadingIndicator;