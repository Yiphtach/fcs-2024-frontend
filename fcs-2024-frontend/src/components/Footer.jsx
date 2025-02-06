import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Youtube, Mail } from 'lucide-react';
import PropTypes from 'prop-types';

// Reuse the same navigation links from header
const footerLinks = [
  { path: '/', label: 'Home', ariaLabel: 'Go to Home' },
  { path: '/fights', label: 'Simulate a Fight', ariaLabel: 'Simulate a Fight' },
  { path: '/leaderboards', label: 'Leaderboard', ariaLabel: 'View Leaderboard' },
  { path: '/about', label: 'About', ariaLabel: 'Learn More About the App' }
];

// Social media links
const socialLinks = [
  { 
    Icon: Github, 
    href: 'https://github.com/yourusername/fight-simulation-app', 
    label: 'GitHub Repository'
  },
  { 
    Icon: Twitter, 
    href: 'https://twitter.com/fightsimapp', 
    label: 'Twitter Profile'
  },
  { 
    Icon: Youtube, 
    href: 'https://youtube.com/fightsimapp', 
    label: 'YouTube Channel'
  },
  { 
    Icon: Mail, 
    href: 'mailto:contact@fightsimapp.com', 
    label: 'Contact Email'
  }
];

// Memoized Footer link component
const FooterLink = memo(({ to, label, ariaLabel, className }) => (
  <Link 
    to={to}
    aria-label={ariaLabel}
    className={`text-gray-300 hover:text-green-400 transition-colors duration-300 ${className}`}
  >
    {label}
  </Link>
));

FooterLink.displayName = 'FooterLink';

// Memoized Social link component
const SocialLink = memo(({ href, Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-gray-300 hover:text-green-400 transition-colors duration-300"
  >
    <Icon className="h-6 w-6" />
  </a>
));

SocialLink.displayName = 'SocialLink';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-gray-800 text-gray-300 py-8 mt-auto" 
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h2 className="text-white text-lg font-bold mb-4">Fight Simulation App</h2>
            <p className="text-sm">
              Experience epic battles between your favorite characters in stunning 3D environments.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <nav role="navigation" aria-label="Footer Quick Links">
              <ul className="space-y-2">
                {footerLinks.map(({ path, label, ariaLabel }) => (
                  <li key={path}>
                    <FooterLink 
                      to={path}
                      label={label}
                      ariaLabel={ariaLabel}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-sm space-y-2">
              <p>Email: contact@fightsimapp.com</p>
              <p>Support: support@fightsimapp.com</p>
              <p>Press: press@fightsimapp.com</p>
            </address>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <SocialLink 
                  key={href}
                  href={href}
                  Icon={Icon}
                  label={label}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              &copy; {currentYear} Fight Simulation App. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link to="/privacy" className="hover:text-green-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-green-400 transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// PropTypes for components
FooterLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  className: PropTypes.string
};

SocialLink.propTypes = {
  href: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired
};

export default memo(Footer);