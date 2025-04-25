import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-800 text-surface-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-primary-500" />
              <span className="font-bold text-lg text-white">FaceGuard</span>
            </div>
            <p className="mb-4">
              Advanced face spoofing detection system using state-of-the-art deep learning technology.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/RiyaGupta122/Face_spoofing" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/detection" className="hover:text-white transition-colors">Detection</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">API Reference</a>
              </li>
              <li>
                <a href="https://github.com/RiyaGupta122/Face_spoofing" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Research Papers</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@faceguard.ai" className="hover:text-white transition-colors">contact@faceguard.ai</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Support</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Careers</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-surface-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} FaceGuard. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;