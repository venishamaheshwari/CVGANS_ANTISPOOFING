import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, AlertTriangle, CheckCircle, RefreshCw, Shield } from 'lucide-react';
import { detectFaceSpoofing } from '../services/detectionService';
import SpoofingResult from '../components/detection/SpoofingResult';
import LoadingIndicator from '../components/ui/LoadingIndicator';

const Detection: React.FC = () => {
  const [isCameraStarted, setIsCameraStarted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const startCamera = () => {
    setIsCameraStarted(true);
    setError(null);
    setCapturedImage(null);
    setDetectionResult(null);
  };

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      return imageSrc;
    }
    return null;
  }, [webcamRef]);

  const handleDetection = useCallback(async () => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const imageSrc = captureImage();
      if (!imageSrc) {
        throw new Error('Failed to capture image');
      }
      
      const result = await detectFaceSpoofing(imageSrc);
      setDetectionResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Detection error:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [captureImage]);

  const resetDetection = () => {
    setCapturedImage(null);
    setDetectionResult(null);
    setError(null);
  };

  // Auto-detect when camera is ready
  useEffect(() => {
    let detectionInterval: NodeJS.Timeout | null = null;
    
    if (isCameraStarted && !capturedImage && !isProcessing) {
      // Start periodic detection after a short delay
      const timer = setTimeout(() => {
        detectionInterval = setInterval(() => {
          handleDetection();
        }, 3000); // Run detection every 3 seconds
      }, 1500);
      
      return () => {
        clearTimeout(timer);
        if (detectionInterval) clearInterval(detectionInterval);
      };
    }
    
    return () => {
      if (detectionInterval) clearInterval(detectionInterval);
    };
  }, [isCameraStarted, capturedImage, isProcessing, handleDetection]);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-surface-900 mb-6 text-center">Face Spoofing Detection</h1>
          <p className="text-lg text-surface-700 mb-8 text-center max-w-3xl mx-auto">
            Position your face within the frame and our system will automatically analyze for spoofing attempts.
            Real-time results will be displayed below the video feed.
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-6">
            {!isCameraStarted ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Camera className="w-16 h-16 text-primary-500 mb-6" />
                <h2 className="text-2xl font-semibold text-surface-800 mb-4">Start Camera to Begin Detection</h2>
                <p className="text-surface-600 mb-8 text-center max-w-md">
                  Your camera will be used to capture images for face spoofing detection. No images are stored permanently.
                </p>
                <motion.button
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium text-lg shadow-md hover:bg-primary-700 transition duration-300"
                  onClick={startCamera}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Camera
                </motion.button>
              </div>
            ) : (
              <div>
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-surface-900">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                      className="w-full h-auto"
                    />
                    
                    {/* Detection overlay elements */}
                    <AnimatePresence>
                      {isProcessing && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center bg-surface-900/30"
                        >
                          <LoadingIndicator size={80} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Face detection guide overlay */}
                    {!capturedImage && !isProcessing && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div 
                          className="w-64 h-64 rounded-full border-4 border-primary-400 border-dashed"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <motion.button
                      className="px-4 py-2 bg-surface-200 text-surface-800 rounded-lg font-medium hover:bg-surface-300 transition duration-300 flex items-center"
                      onClick={resetDetection}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isProcessing}
                    >
                      <RefreshCw className="w-5 h-5 mr-2" />
                      Reset
                    </motion.button>
                    
                    <motion.button
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition duration-300 flex items-center"
                      onClick={handleDetection}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isProcessing}
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      {isProcessing ? 'Processing...' : 'Detect Now'}
                    </motion.button>
                  </div>
                </div>

                {/* Results display */}
                <AnimatePresence>
                  {detectionResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="mt-8"
                    >
                      <SpoofingResult result={detectionResult} image={capturedImage} />
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="mt-8 p-4 bg-error-50 border border-error-200 rounded-lg"
                    >
                      <div className="flex items-start">
                        <AlertTriangle className="w-6 h-6 text-error-500 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-lg font-medium text-error-800">Detection Error</h3>
                          <p className="text-error-700 mt-1">{error}</p>
                          <p className="text-error-600 mt-2">
                            Please ensure your face is clearly visible and well-lit, then try again.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        <div className="bg-surface-100 rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold text-surface-800 mb-4">Tips for Accurate Detection</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="bg-primary-100 p-1 rounded-full mr-3 mt-1">
                <CheckCircle className="w-4 h-4 text-primary-600" />
              </div>
              <p className="text-surface-700">Ensure your face is well-lit and clearly visible</p>
            </li>
            <li className="flex items-start">
              <div className="bg-primary-100 p-1 rounded-full mr-3 mt-1">
                <CheckCircle className="w-4 h-4 text-primary-600" />
              </div>
              <p className="text-surface-700">Look directly at the camera</p>
            </li>
            <li className="flex items-start">
              <div className="bg-primary-100 p-1 rounded-full mr-3 mt-1">
                <CheckCircle className="w-4 h-4 text-primary-600" />
              </div>
              <p className="text-surface-700">Remove glasses or other accessories that may obscure facial features</p>
            </li>
            <li className="flex items-start">
              <div className="bg-primary-100 p-1 rounded-full mr-3 mt-1">
                <CheckCircle className="w-4 h-4 text-primary-600" />
              </div>
              <p className="text-surface-700">For best results, avoid extreme angles or partial face visibility</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Detection;