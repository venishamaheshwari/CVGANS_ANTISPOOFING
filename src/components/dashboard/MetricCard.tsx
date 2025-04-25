import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'accent' | 'success';
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  positive, 
  icon, 
  color 
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary-100',
          text: 'text-primary-600',
          icon: 'text-primary-500'
        };
      case 'secondary':
        return {
          bg: 'bg-secondary-100',
          text: 'text-secondary-600',
          icon: 'text-secondary-500'
        };
      case 'accent':
        return {
          bg: 'bg-accent-100',
          text: 'text-accent-600',
          icon: 'text-accent-500'
        };
      case 'success':
        return {
          bg: 'bg-success-100',
          text: 'text-success-600',
          icon: 'text-success-500'
        };
      default:
        return {
          bg: 'bg-primary-100',
          text: 'text-primary-600',
          icon: 'text-primary-500'
        };
    }
  };

  const colorClasses = getColorClass();

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-lg ${colorClasses.bg}`}>
          <div className={colorClasses.icon}>{icon}</div>
        </div>
        <div className="flex items-center">
          <span className={`text-sm font-medium ${positive ? 'text-success-600' : 'text-error-600'}`}>
            {change}
          </span>
          {positive ? (
            <ArrowUpRight className="w-4 h-4 text-success-600 ml-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-error-600 ml-1" />
          )}
        </div>
      </div>
      
      <h3 className="mt-4 text-surface-500 text-sm font-medium">{title}</h3>
      <p className="mt-2 text-2xl font-bold text-surface-900">{value}</p>
    </motion.div>
  );
};

export default MetricCard;