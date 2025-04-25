import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Camera, PieChart, FileCode } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-10 h-10 text-primary-600" />,
    title: 'Advanced Protection',
    description: 'State-of-the-art algorithms detect sophisticated spoofing attempts, including printed photos, digital screens, and deepfakes.'
  },
  {
    icon: <Camera className="w-10 h-10 text-primary-600" />,
    title: 'Real-time Analysis',
    description: 'Instant feedback with live camera feed processing ensures immediate threat detection and response.'
  },
  {
    icon: <PieChart className="w-10 h-10 text-primary-600" />,
    title: 'Detailed Analytics',
    description: 'Comprehensive dashboard with detection metrics, confidence scores, and historical analysis.'
  },
  {
    icon: <FileCode className="w-10 h-10 text-primary-600" />,
    title: 'Explainable AI',
    description: 'Visualize what our models see with heatmaps and feature importance metrics for transparent detection.'
  }
];

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-24">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-surface-900 mb-6 leading-tight">
              Advanced Face Spoofing <span className="text-primary-600">Detection System</span>
            </h1>
            <p className="text-lg text-surface-700 mb-8 leading-relaxed">
              Protect your biometric authentication systems with our cutting-edge face spoofing detection technology. 
              Using advanced deep learning models, our system can detect various presentation attacks in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/detection">
                <motion.button 
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium text-lg shadow-lg hover:bg-primary-700 transition duration-300 w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Detection
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button 
                  className="px-6 py-3 bg-surface-200 text-surface-800 rounded-lg font-medium text-lg hover:bg-surface-300 transition duration-300 w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </motion.div>
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Face Recognition Technology" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-700/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-surface-900/80 to-transparent">
                <p className="text-white text-lg font-medium">Safeguarding digital identities with AI-powered protection</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-surface-900 mb-4">Key Features</h2>
          <p className="text-lg text-surface-700 max-w-3xl mx-auto">
            Our system combines multiple advanced technologies to provide comprehensive protection against face spoofing attacks.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-surface-900 mb-2">{feature.title}</h3>
              <p className="text-surface-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <div className="bg-gradient-to-r from-primary-800 to-primary-900 rounded-2xl overflow-hidden shadow-xl">
          <div className="container mx-auto px-6 py-12">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-2/3 mb-8 lg:mb-0">
                <h2 className="text-3xl font-bold text-white mb-6">Ready to enhance your security?</h2>
                <p className="text-primary-100 text-lg mb-8 max-w-2xl">
                  Start using our face spoofing detection system today to protect your applications,
                  services, and users from sophisticated presentation attacks.
                </p>
                <Link to="/detection">
                  <motion.button 
                    className="px-8 py-4 bg-white text-primary-800 rounded-lg font-semibold text-lg shadow-lg hover:bg-primary-50 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try it Now
                  </motion.button>
                </Link>
              </div>
              <div className="lg:w-1/3 flex justify-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4,
                    ease: "easeInOut"
                  }}
                >
                  <Shield className="w-40 h-40 text-white opacity-20" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;