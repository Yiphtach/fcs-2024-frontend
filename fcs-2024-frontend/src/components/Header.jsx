import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Swords, Trophy, Info } from 'lucide-react';
import PropTypes from 'prop-types';

// Navigation links with icons for better visual hierarchy
const navLinks = [
  { path: '/', label: 'Home', ariaLabel: 'Go to Home', Icon: Home },
  { path: '/fights', label: 'Simulate a Fight', ariaLabel: 'Simulate a Fight', Icon: Swords },
  { path: '/leaderboards', label: 'Leaderboard', ariaLabel: 'View Leaderboard', Icon: Trophy },
  { path: '/about', label: 'About', ariaLabel: 'Learn More About the App', Icon: Info }
];

// Memoized NavLink component for better performance
const NavLink = memo(({ path, label, ariaLabel, Icon, isActive, onClick }) => (
  <Link 
    to={path}
    aria-label={ariaLabel}
    aria-current={isActive ? 'page' : undefined}
    className={`flex items-center gap-2 text-white hover:text-green-400 transition-colors duration-300 py-2
      ${isActive ? 'text-green-400 border-b-2 border-green-400' : ''}
    `}
    onClick={onClick}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </Link>
));

NavLink.displayName = 'NavLink';

NavLink.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};

const Header = ({ title = "Fight Simulation App" }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const mobileNavRef = useRef(null);
  const headerRef = useRef(null);

  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setScrolled(scrollPosition > 20);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape' && isNavOpen) {
      setIsNavOpen(false);
    }
  }, [isNavOpen]);

  // Throttled scroll listener
  useEffect(() => {
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => window.removeEventListener('scroll', scrollListener);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsNavOpen(false);
  }, [location]);

  // Handle outside clicks and keyboard navigation
  useEffect(() => {
    if (!isNavOpen) return;

    const handleOutsideClick = (event) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    
    // Lock body scroll when mobile menu is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isNavOpen, handleKeyDown]);

  return (
    <header 
      ref={headerRef}
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
            className="text-white text-2xl font-bold hover:text-green-400 transition-colors duration-300 flex items-center gap-2"
          >
            <Swords className="h-8 w-8" />
            <span className="hidden sm:inline">{title}</span>
          </Link>

          {/* Navigation */}
          <nav role="navigation" aria-label="Main Navigation">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
              aria-label={isNavOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isNavOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              {isNavOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-8" role="menubar">
              {navLinks.map(({ path, label, ariaLabel, Icon }) => (
                <li key={path} role="none">
                  <NavLink
                    path={path}
                    label={label}
                    ariaLabel={ariaLabel}
                    Icon={Icon}
                    isActive={location.pathname === path}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          id="mobile-menu"
          ref={mobileNavRef}
          className={`md:hidden fixed inset-0 bg-gray-800 transform transition-transform duration-300 ease-in-out
            ${isNavOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
          style={{ top: scrolled ? '56px' : '72px' }}
          aria-hidden={!isNavOpen}
        >
          <ul 
            className="flex flex-col items-center space-y-8 pt-8"
            role="menu"
          >
            {navLinks.map(({ path, label, ariaLabel, Icon }) => (
              <li key={path} role="menuitem">
                <NavLink
                  path={path}
                  label={label}
                  ariaLabel={ariaLabel}
                  Icon={Icon}
                  isActive={location.pathname === path}
                  onClick={() => setIsNavOpen(false)}
                />
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

export default memo(Header);