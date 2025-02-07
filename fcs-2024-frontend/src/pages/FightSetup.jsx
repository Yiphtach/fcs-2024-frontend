import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Dice, 
  ChevronRight, 
  Search,
  ImageOff
} from 'lucide-react';
import PropTypes from 'prop-types';

// Universe Card Component
const UniverseCard = ({ universe, isSelected, onSelect }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden rounded-xl cursor-pointer
        transition-all duration-300 group
        ${isSelected ? 'ring-4 ring-green-400' : 'hover:ring-2 hover:ring-green-400/50'}
      `}
      onClick={() => onSelect(universe.id)}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(universe.id);
        }
      }}
    >
      {!imageError ? (
        <img 
          src={universe.backgroundImage}
          alt={`${universe.name} background`}
          className="absolute inset-0 w-full h-full object-cover opacity-30 transition-opacity duration-300 group-hover:opacity-40"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <ImageOff className="w-12 h-12 text-gray-600" />
        </div>
      )}
      
      <div className="relative p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent h-full">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            {universe.name}
          </h2>
          <p className="text-gray-300">
            {universe.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 text-sm text-gray-400">
              <Users className="w-4 h-4" />
              {universe.characterCount} Characters
            </span>
            <motion.div 
              className="px-4 py-2 bg-green-500 text-white rounded-lg
                       hover:bg-green-600 transition-colors duration-300
                       flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Select
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

UniverseCard.propTypes = {
  universe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    characterCount: PropTypes.number.isRequired,
    backgroundImage: PropTypes.string.isRequired
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

// Universe Search Component
const UniverseSearch = ({ onSearch }) => (
  <div className="relative mb-8">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Search universes..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full max-w-md px-10 py-2 bg-gray-800 text-white rounded-lg
               border border-gray-700 focus:ring-2 focus:ring-green-400
               focus:border-transparent transition-all duration-300"
    />
  </div>
);

UniverseSearch.propTypes = {
  onSearch: PropTypes.func.isRequired
};

const FightSetup = () => {
  const [selectedUniverse, setSelectedUniverse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const universes = [
    {
      id: 'dc',
      name: 'DC',
      description: 'Home to Superman, Batman, and Wonder Woman',
      characterCount: 150,
      backgroundImage: '/images/dc-background.jpg'
    },
    {
      id: 'marvel',
      name: 'Marvel',
      description: 'Realm of Avengers and X-Men',
      characterCount: 200,
      backgroundImage: '/images/marvel-background.jpg'
    },
    {
      id: 'anime',
      name: 'Anime',
      description: 'Epic fighters from various anime universes',
      characterCount: 100,
      backgroundImage: '/images/anime-background.jpg'
    }
  ];

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredUniverses = universes.filter(universe =>
    universe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    universe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUniverseSelect = (universeId) => {
    setSelectedUniverse(universeId);
    setTimeout(() => {
      navigate(`/fights/select-character?universe=${encodeURIComponent(universeId)}`);
    }, 300);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Choose Your Universe
          </h1>
          <p className="text-xl text-gray-300">
            Select a universe to begin your epic battle across dimensions!
          </p>
        </motion.div>

        {/* Search Bar */}
        <UniverseSearch onSearch={setSearchTerm} />

        {/* Universe Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center min-h-[400px]"
            >
              <div className="loading-spinner" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {filteredUniverses.map((universe) => (
                <UniverseCard
                  key={universe.id}
                  universe={universe}
                  isSelected={selectedUniverse === universe.id}
                  onSelect={handleUniverseSelect}
                />
              ))}
              {filteredUniverses.length === 0 && (
                <div className="col-span-full text-center text-gray-400 py-12">
                  No universes found matching your search.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions */}
        <div className="flex justify-center space-x-6">
          <Link 
            to="/fights/gallery"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg
                     hover:bg-blue-600 transition-colors duration-300
                     flex items-center space-x-2"
          >
            <Users className="w-5 h-5" />
            <span>View All Characters</span>
          </Link>
          <Link 
            to="/fights/random"
            className="px-6 py-3 bg-purple-500 text-white rounded-lg
                     hover:bg-purple-600 transition-colors duration-300
                     flex items-center space-x-2"
          >
            <Dice className="w-5 h-5" />
            <span>Random Match</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FightSetup;