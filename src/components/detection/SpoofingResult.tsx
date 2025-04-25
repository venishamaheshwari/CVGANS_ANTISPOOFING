import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, Eye } from 'lucide-react';
import GradCAMVisualization from './GradCAMVisualization';

interface SpoofingResultProps {
  result: {
    isReal: boolean;
    confidence: number;
    attackType?: string;
    gradCamData?: any;
  };
  image: string | null;
}

const SpoofingResult: React.FC<SpoofingResultProps> = ({ result, image }) => {
  const [showVisualization, setShowVisualization] = useState(false);
  
  const confidencePercent = (result.confidence * 100).toFixed(2);
  
  return (
    <div>
      <div className={`rounded-lg p-6 ${
        result.isReal ? 'bg-success-50 border border-success-200' : 'bg-error-50 border border-error-200'
      }`}>
        <div className="flex items-start">
          <div className="mr-4 flex-shrink-0">
            {result.isReal ? (
              <div className="bg-success-100 p-2 rounded-full">
                <CheckCircle className="w-8 h-8 text-success-600" />
              </div>
            ) : (
              <div className="bg-error-100 p-2 rounded-full">
                <AlertTriangle className="w-8 h-8 text-error-600" />
              </div>
            )}
          </div>
          
          <div className="flex-grow">
            <h3 className={`text-xl font-bold mb-2 ${
              result.isReal ? 'text-success-800' : 'text-error-800'
            }`}>
              {result.isReal ? 'Real Face Detected' : 'Spoofing Attempt Detected'}
            </h3>
            
            <p className={`mb-4 ${
              result.isReal ? 'text-success-700' : 'text-error-700'
            }`}>
              {result.isReal 
                ? 'Our system has determined this is a genuine face with high confidence.' 
                : `This appears to be a spoofing attempt. ${result.attackType ? `Detected attack type: ${result.attackType}` : ''}`
              }
            </p>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className={`text-sm font-medium ${
                  result.isReal ? 'text-success-800' : 'text-error-800'
                }`}>
                  Confidence Level
                </span>
                <span className={`text-sm font-medium ${
                  result.isReal ? 'text-success-800' : 'text-error-800'
                }`}>
                  {confidencePercent}%
                </span>
              </div>
              <div className="w-full bg-surface-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidencePercent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-2 rounded-full ${
                    result.isReal ? 'bg-success-500' : 'bg-error-500'
                  }`}
                ></motion.div>
              </div>
            </div>
            
            {result.gradCamData && (
              <button
                className={`text-sm font-medium flex items-center ${
                  result.isReal ? 'text-success-700' : 'text-error-700'
                } hover:underline`}
                onClick={() => setShowVisualization(!showVisualization)}
              >
                <Eye className="w-4 h-4 mr-1" />
                {showVisualization ? 'Hide' : 'View'} Detection Heatmap
              </button>
            )}
          </div>
        </div>
      </div>
      
      {showVisualization && result.gradCamData && image && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <GradCAMVisualization 
            gradCamData={result.gradCamData} 
            originalImage={image} 
          />
        </motion.div>
      )}
      
      <div className="mt-4 p-4 bg-surface-100 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-primary-500 mr-2 mt-0.5" />
          <p className="text-sm text-surface-700">
            {result.isReal 
              ? 'This face appears to be real. You can proceed with biometric authentication.' 
              : 'This face appears to be spoofed. For security reasons, biometric authentication is not recommended.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpoofingResult;