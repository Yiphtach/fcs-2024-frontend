import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import PropTypes from 'prop-types';

const Header = ({ title = "Fight Simulation App" }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home', ariaLabel: 'Go to Home' },
    { path: '/fights', label: 'Simulate a Fight', ariaLabel: 'Simulate a Fight' },
    { path: '/leaderboards', label: 'Leaderboard', ariaLabel: 'View Leaderboard' },
    { path: '/about', label: 'About', ariaLabel: 'Learn More About the App' }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsNavOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 w-full transition-all duration-300 z-50
        ${scrolled ? 'bg-gray-800/95 backdrop-blur-sm shadow-lg py-2' : 'bg-gray-800 py-4'}
      `}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            aria-label="Fight Simulation App Home" 
            className="text-white text-2xl font-bold hover:text-green-400 transition-colors duration-300"
          >
            {title}
          </Link>

          {/* Navigation */}
          <nav role="navigation" aria-label="Main Navigation">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
              aria-label={isNavOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isNavOpen}
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              {isNavOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-8">
              {navLinks.map(({ path, label, ariaLabel }) => (
                <li key={path}>
                  <Link 
                    to={path}
                    aria-label={ariaLabel}
                    className={`text-white hover:text-green-400 transition-colors duration-300 py-2
                      ${location.pathname === path ? 'border-b-2 border-green-400' : ''}
                    `}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden fixed inset-0 bg-gray-800 transform transition-transform duration-300 ease-in-out ${
            isNavOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ top: '64px' }}
        >
          <ul className="flex flex-col items-center space-y-8 pt-8">
            {navLinks.map(({ path, label, ariaLabel }) => (
              <li key={path}>
                <Link 
                  to={path}
                  aria-label={ariaLabel}
                  className={`text-xl text-white hover:text-green-400 transition-colors duration-300
                    ${location.pathname === path ? 'text-green-400' : ''}
                  `}
                  onClick={() => setIsNavOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string
};

export default Header;