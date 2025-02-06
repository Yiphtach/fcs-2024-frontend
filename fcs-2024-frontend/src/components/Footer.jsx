import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-5 text-center text-base" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-5">
        <p>&copy; {new Date().getFullYear()} Fight Simulation App. All rights reserved.</p>
        
        <nav role="navigation" aria-label="Footer Navigation" className="mt-4">
          <ul className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <li>
              <Link 
                to="/" 
                aria-label="Go to Home" 
                className="text-white hover:text-green-500 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/fights" 
                aria-label="Simulate a Fight" 
                className="text-white hover:text-green-500 transition-colors duration-300"
              >
                Simulate a Fight
              </Link>
            </li>
            <li>
              <Link 
                to="/leaderboards" 
                aria-label="View Leaderboard" 
                className="text-white hover:text-green-500 transition-colors duration-300"
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                aria-label="Learn More About the App" 
                className="text-white hover:text-green-500 transition-colors duration-300"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;