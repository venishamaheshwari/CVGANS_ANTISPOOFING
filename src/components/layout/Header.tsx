import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-primary-600" />
            <span className="font-bold text-xl text-surface-900">FaceGuard</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Home', path: '/' },
              { name: 'Detection', path: '/detection' },
              { name: 'Dashboard', path: '/dashboard' },
              { name: 'About', path: '/about' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 relative ${
                  location.pathname === item.path
                    ? 'text-primary-600'
                    : 'text-surface-700 hover:text-surface-900'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 h-0.5 bg-primary-600 bottom-[-5px]"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-surface-800 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Try Now Button (Desktop) */}
          <Link to="/detection" className="hidden md:block">
            <motion.button
              className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Now
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatedMobileMenu isOpen={isMenuOpen} />
    </header>
  );
};

const AnimatedMobileMenu: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const location = useLocation();
  
  return (
    <motion.div
      initial={false}
      animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden overflow-hidden bg-white shadow-lg"
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col space-y-4">
          {[
            { name: 'Home', path: '/' },
            { name: 'Detection', path: '/detection' },
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'About', path: '/about' }
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-base font-medium py-2 ${
                location.pathname === item.path
                  ? 'text-primary-600'
                  : 'text-surface-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/detection" className="w-full">
            <button className="w-full py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition duration-300">
              Try Now
            </button>
          </Link>
        </nav>
      </div>
    </motion.div>
  );
};

export default Header;