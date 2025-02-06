import  { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  const [isNavActive, setIsNavActive] = useState(false);
  const fightLogRef = useRef(null);

  // Scroll fight log to bottom when component mounts or fight log updates
  useEffect(() => {
    if (fightLogRef.current) {
      fightLogRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Handle fight again button click using standard navigation
  const handleFightAgain = () => {
    window.location.href = '/fights';
  };

  // Toggle mobile navigation
  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <div className="min-h-screen">
      {/* Header with Navigation */}
      <header className="bg-gray-800 text-white p-4">
        <nav className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Fight Simulator</h1>
          
          {/* Mobile Burger Menu */}
          <button 
            className="md:hidden flex flex-col space-y-1"
            onClick={toggleNav}
            aria-label="Toggle navigation"
          >
            <span className={`w-6 h-0.5 bg-white transition-all ${isNavActive ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${isNavActive ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${isNavActive ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>

          {/* Navigation Links */}
          <ul className={`md:flex md:space-x-4 ${isNavActive ? 'absolute top-16 right-0 bg-gray-800 p-4 space-y-2' : 'hidden md:block'}`}>
            <li><a href="/" className="hover:text-gray-300">Home</a></li>
            <li><a href="/characters" className="hover:text-gray-300">Characters</a></li>
            <li><a href="/fights" className="hover:text-gray-300">Fights</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Fight Log Section */}
      <section id="fight-log" ref={fightLogRef} className="bg-gray-100 p-4 mt-8 rounded-lg">
        {/* Fight log content would be passed as children or props */}
      </section>

      {/* Fight Again Button */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={handleFightAgain}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
        >
          Simulate Another Fight
        </button>
      </div>
    </div>
  );
};

// Character Form Component
const CharacterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    universe: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.universe) {
      alert('Please fill in both the name and universe fields.');
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div>
        <label htmlFor="name" className="block text-gray-700 mb-2">Character Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label htmlFor="universe" className="block text-gray-700 mb-2">Universe</label>
        <input
          type="text"
          id="universe"
          name="universe"
          value={formData.universe}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

// Image component with lazy loading
// eslint-disable-next-line react/prop-types
const LazyImage = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
    />
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired
};

CharacterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export { Layout, CharacterForm, LazyImage };