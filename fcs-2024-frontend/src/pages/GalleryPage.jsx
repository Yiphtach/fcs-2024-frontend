import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, Shield, Swords, Zap, Brain } from 'lucide-react';
import '../styles/GalleryPage.css';

const StatBadge = ({ icon: Icon, value, color }) => (
  <div className={`flex items-center gap-1 ${color}`}>
    <Icon className="w-4 h-4" />
    <span>{value}</span>
  </div>
);

StatBadge.propTypes = {
  icon: PropTypes.elementType.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired
};

const CharacterCard = ({ character }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="character-card bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-w-3 aspect-h-4">
        {!imageError ? (
          <img
            src={character.imageUrl}
            alt={character.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <Users className="w-12 h-12 text-gray-500" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{character.name}</h3>
        <p className="text-gray-400 mb-4">{character.universe}</p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <StatBadge icon={Swords} value={character.stats.strength} color="text-red-400" />
          <StatBadge icon={Zap} value={character.stats.speed} color="text-blue-400" />
          <StatBadge icon={Brain} value={character.stats.intelligence} color="text-purple-400" />
          <StatBadge icon={Shield} value={character.stats.durability} color="text-yellow-400" />
        </div>

        <div className="flex gap-2">
          <Link
            to={`/fights/selectCharacter?charId=${character._id}`}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-center"
          >
            Select
          </Link>
          <Link
            to={`/characters/${character._id}`}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-center"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    universe: PropTypes.string.isRequired,
    stats: PropTypes.shape({
      strength: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
      intelligence: PropTypes.number.isRequired,
      durability: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

const GalleryPage = ({ characters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniverse, setSelectedUniverse] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const universes = [...new Set(characters.map(char => char.universe))];

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredCharacters = characters.filter(character => {
    const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUniverse = !selectedUniverse || character.universe === selectedUniverse;
    return matchesSearch && matchesUniverse;
  });

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Character Gallery</h1>
          <p className="text-gray-400">Browse and select characters for your next battle</p>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search characters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={selectedUniverse}
              onChange={(e) => setSelectedUniverse(e.target.value)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Universes</option>
              {universes.map(universe => (
                <option key={universe} value={universe}>
                  {universe}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Character Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="loading-spinner" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredCharacters.map(character => (
                  <CharacterCard key={character._id} character={character} />
                ))}
              </AnimatePresence>
              
              {filteredCharacters.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <p className="text-gray-400">No characters found matching your criteria</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

GalleryPage.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      universe: PropTypes.string.isRequired,
      stats: PropTypes.shape({
        strength: PropTypes.number.isRequired,
        speed: PropTypes.number.isRequired,
        intelligence: PropTypes.number.isRequired,
        durability: PropTypes.number.isRequired
      }).isRequired
    })
  ).isRequired
};

export default GalleryPage;