import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Shield, Zap, Code, Lock, LineChart, Github, Mail } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-surface-900 mb-3 text-center">About Our Technology</h1>
        <p className="text-lg text-surface-700 mb-12 text-center max-w-3xl mx-auto">
          Learn how our advanced face spoofing detection system works to protect your biometric authentication.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative h-full">
            <div className="rounded-xl overflow-hidden shadow-xl h-full">
              <img 
                src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Face Spoofing Technology" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-800/70 to-transparent flex items-end">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Cutting-Edge Security</h2>
                  <p className="text-primary-100">
                    Our system uses advanced deep learning models to detect sophisticated face spoofing attacks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-surface-900 mb-6">What is Face Spoofing?</h2>
          <p className="text-lg text-surface-700 mb-6 leading-relaxed">
            Face spoofing is the act of attempting to bypass facial recognition systems by presenting fake biometric data. 
            These attacks can include presenting printed photos, digital screens, 3D masks, or deepfake videos 
            to trick biometric authentication systems.
          </p>
          <p className="text-lg text-surface-700 mb-6 leading-relaxed">
            As facial recognition becomes more common in security applications, the sophistication of 
            spoofing attacks has increased, making robust anti-spoofing systems essential for secure biometric authentication.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-100 p-4 rounded-lg flex flex-col items-center text-center">
              <div className="bg-primary-100 p-3 rounded-full mb-3">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-surface-800 mb-1">Enhanced Security</h3>
              <p className="text-sm text-surface-600">Protects sensitive systems from unauthorized access</p>
            </div>
            <div className="bg-surface-100 p-4 rounded-lg flex flex-col items-center text-center">
              <div className="bg-primary-100 p-3 rounded-full mb-3">
                <Zap className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-surface-800 mb-1">Real-time Detection</h3>
              <p className="text-sm text-surface-600">Immediate analysis and protection with minimal latency</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-surface-900 mb-3">How It Works</h2>
          <p className="text-lg text-surface-700 max-w-3xl mx-auto">
            Our system employs a multi-stage approach to detect various types of face spoofing attacks.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Camera className="w-10 h-10 text-primary-600" />,
              title: "Face Detection",
              description: "Advanced face detection using MTCNN or RetinaFace to accurately locate and extract facial regions."
            },
            {
              icon: <Code className="w-10 h-10 text-primary-600" />,
              title: "Feature Extraction",
              description: "Deep CNN models like EfficientNet or ResNet50 extract discriminative features from facial images."
            },
            {
              icon: <LineChart className="w-10 h-10 text-primary-600" />,
              title: "Multi-modal Analysis",
              description: "Combines texture, depth, and temporal information for comprehensive spoofing detection."
            },
            {
              icon: <Lock className="w-10 h-10 text-primary-600" />,
              title: "Classification",
              description: "Binary classification with attention mechanisms to determine if an image is real or spoofed."
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-surface-900 mb-3">{step.title}</h3>
              <p className="text-surface-700">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-surface-900 mb-3">Technical Details</h2>
          <p className="text-lg text-surface-700 max-w-3xl mx-auto">
            Our system combines several advanced techniques to achieve high-performance face spoofing detection.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8">
              <h3 className="text-xl font-semibold text-surface-900 mb-6">Models & Architectures</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-primary-100 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-surface-800">CNN Backbone</h4>
                    <p className="text-surface-600 text-sm">EfficientNet or ResNet50 for efficient feature extraction</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-surface-800">Attention Mechanisms</h4>
                    <p className="text-surface-600 text-sm">Self-attention modules to focus on discriminative regions</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-surface-800">Temporal Models</h4>
                    <p className="text-surface-600 text-sm">LSTM or TCN for video sequence analysis (optional)</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-surface-800">Multi-modal Fusion</h4>
                    <p className="text-surface-600 text-sm">Combines RGB, depth, and motion cues for robust detection</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="p-8 bg-surface-50">
              <h3 className="text-xl font-semibold text-surface-900 mb-6">Evaluation Metrics</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-primary-100 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-surface-800">APCER (Attack Presentation Classification Error Rate)</h4>
                    <p className="text-surface-600 text-sm">Measures the proportion of attack presentations incorrectly classified as genuine presentations</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-surface-800">BPCER (Bona Fide Presentation Classification Error Rate)</h4>
                    <p className="text-surface-600 text-sm">Measures the proportion of genuine presentations incorrectly classified as attack presentations</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-surface-800">EER (Equal Error Rate)</h4>
                    <p className="text-surface-600 text-sm">The rate at which APCER equals BPCER</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 p-1 rounded-full mr-3 mt-1">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-surface-800">ROC-AUC</h4>
                    <p className="text-surface-600 text-sm">Area under the Receiver Operating Characteristic curve</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-surface-900 mb-3">Get in Touch</h2>
          <p className="text-lg text-surface-700 max-w-3xl mx-auto">
            Interested in learning more about our face spoofing detection technology? Contact us or explore our resources.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a 
            href="https://github.com/RiyaGupta122/Face_spoofing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group"
          >
            <motion.div 
              className="bg-surface-800 rounded-xl p-8 h-full hover:bg-surface-900 transition-colors duration-300 text-center"
              whileHover={{ y: -5 }}
            >
              <Github className="w-16 h-16 text-white mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-white mb-2">GitHub Repository</h3>
              <p className="text-surface-300 mb-6">
                Explore our open-source code, contribute to the project, or use our models in your own applications.
              </p>
              <span className="text-primary-400 font-medium inline-flex items-center group-hover:text-primary-300">
                View Repository
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.div>
          </a>
          
          <motion.div 
            className="bg-primary-600 rounded-xl p-8 h-full text-center"
            whileHover={{ y: -5 }}
          >
            <Mail className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-white mb-2">Contact Us</h3>
            <p className="text-primary-200 mb-6">
              Have questions about implementation or want to discuss potential use cases? Get in touch with our team.
            </p>
            <a href="mailto:contact@facespoofing.ai" className="text-white font-medium inline-flex items-center hover:text-primary-100">
              Send Email
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transform hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;