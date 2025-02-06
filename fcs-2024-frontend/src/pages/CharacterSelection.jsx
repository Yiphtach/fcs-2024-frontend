import { useState, useMemo, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Swords, 
  Search, 
  X, 
  Filter,
  ArrowLeftRight,
  Shield,
  Brain,
  Zap
} from 'lucide-react';
import PropTypes from 'prop-types';

// Stat icons mapping
const statIcons = {
  strength: Swords,
  speed: Zap,
  intelligence: Brain,
  durability: Shield
};

// Character card animations
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9 }
};

const StatBar = ({ label, value, icon: Icon, color }) => (
  <div className="flex items-center gap-2" title={`${label}: ${value}`}>
    <Icon className={`w-4 h-4 ${color}`} aria-label={label} />
    <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-500`}
        style={{ width: `${value}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={`${label} stat value`}
      />
    </div>
    <span className="text-sm font-medium w-8">{value}</span>
  </div>
);

StatBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired
};

const CharacterCard = memo(({ character, isSelected, onSelect, showStats = true }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative rounded-xl overflow-hidden cursor-pointer
        transition-all duration-300 bg-gray-800 h-full
        ${isSelected ? 'ring-4 ring-green-400' : 'hover:ring-2 hover:ring-green-400/50'}
      `}
      onClick={onSelect}
    >
      <div className="aspect-w-3 aspect-h-4">
        <img
          src={character.imageUrl}
          alt={character.name}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent absolute bottom-0 w-full">
        <h3 className="text-xl font-bold text-white mb-2">{character.name}</h3>
        {showStats && (
          <div className="space-y-2">
            <StatBar 
              label="Character Strength" 
              value={character.stats.strength}
              icon={statIcons.strength}
              color="text-red-400"
            />
            <StatBar 
              label="Character Speed" 
              value={character.stats.speed}
              icon={statIcons.speed}
              color="text-blue-400"
            />
            <StatBar 
              label="Character Intelligence" 
              value={character.stats.intelligence}
              icon={statIcons.intelligence}
              color="text-purple-400"
            />
            <StatBar 
              label="Character Durability" 
              value={character.stats.durability}
              icon={statIcons.durability}
              color="text-yellow-400"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
});


CharacterCard.propTypes = {
  character: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    stats: PropTypes.shape({
      strength: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
      intelligence: PropTypes.number.isRequired,
      durability: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  showStats: PropTypes.bool
};

CharacterCard.displayName = 'CharacterCard';

const compareStats = (stat1, stat2) => {
  if (stat1 > stat2) return 'text-green-400';
  if (stat1 < stat2) return 'text-red-400';
  return 'text-gray-400';
};

const CharacterComparison = ({ character1, character2 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-24 left-1/2 transform -translate-x-1/2 
                 bg-gray-800/95 backdrop-blur-sm p-6 rounded-xl shadow-xl"
    >
      <h3 className="text-xl font-bold mb-4 text-center">Battle Analysis</h3>
      <div className="grid grid-cols-3 gap-4 min-w-[600px]">
        <div className="text-right">
          <p className={compareStats(character1.stats.strength, character2.stats.strength)}>
            {character1.stats.strength}
          </p>
          <p className={compareStats(character1.stats.speed, character2.stats.speed)}>
            {character1.stats.speed}
          </p>
          <p className={compareStats(character1.stats.intelligence, character2.stats.intelligence)}>
            {character1.stats.intelligence}
          </p>
          <p className={compareStats(character1.stats.durability, character2.stats.durability)}>
            {character1.stats.durability}
          </p>
        </div>
        <div className="text-center text-gray-400">
          <p>Strength</p>
          <p>Speed</p>
          <p>Intelligence</p>
          <p>Durability</p>
        </div>
        <div className="text-left">
          <p className={compareStats(character2.stats.strength, character1.stats.strength)}>
            {character2.stats.strength}
          </p>
          <p className={compareStats(character2.stats.speed, character1.stats.speed)}>
            {character2.stats.speed}
          </p>
          <p className={compareStats(character2.stats.intelligence, character1.stats.intelligence)}>
            {character2.stats.intelligence}
          </p>
          <p className={compareStats(character2.stats.durability, character1.stats.durability)}>
            {character2.stats.durability}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

CharacterComparison.propTypes = {
  character1: PropTypes.shape({
    stats: PropTypes.shape({
      strength: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
      intelligence: PropTypes.number.isRequired,
      durability: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  character2: PropTypes.shape({
    stats: PropTypes.shape({
      strength: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
      intelligence: PropTypes.number.isRequired,
      durability: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

const CharacterSelection = ({ characters, universe }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [opponentCharacter, setOpponentCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [filters, setFilters] = useState({
    minStrength: 0,
    minSpeed: 0,
    minIntelligence: 0,
    minDurability: 0
  });
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  // Memoized filtered and sorted characters
  const filteredCharacters = useMemo(() => {
    let result = characters.filter(char => {
      // Name search filter
      const nameMatch = char.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Stats filters
      const meetsMinStats = 
        char.stats.strength >= filters.minStrength &&
        char.stats.speed >= filters.minSpeed &&
        char.stats.intelligence >= filters.minIntelligence &&
        char.stats.durability >= filters.minDurability;
      
      return nameMatch && meetsMinStats;
    });

    // Apply sorting if selected
    if (sortBy) {
      result = [...result].sort((a, b) => b.stats[sortBy] - a.stats[sortBy]);
    }

    return result;
  }, [characters, searchTerm, sortBy, filters]);

  const handleCharacterSelect = useCallback((character) => {
    setSelectedCharacter(character);
    if (opponentCharacter?._id === character._id) {
      setOpponentCharacter(null);
    }
  }, [opponentCharacter]);

  const handleOpponentSelect = useCallback((character) => {
    setOpponentCharacter(character);
  }, []);

  const handleStartFight = useCallback(() => {
    if (selectedCharacter && opponentCharacter) {
      navigate('/fights/simulate', {
        state: {
          char1Id: selectedCharacter._id,
          char2Id: opponentCharacter._id
        }
      });
    }
  }, [selectedCharacter, opponentCharacter, navigate]);

  const handleSwapCharacters = useCallback(() => {
    if (selectedCharacter && opponentCharacter) {
      const temp = selectedCharacter;
      setSelectedCharacter(opponentCharacter);
      setOpponentCharacter(temp);
    }
  }, [selectedCharacter, opponentCharacter]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-900 text-white p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Universe Selection</span>
          </button>
          <h1 className="text-3xl font-bold">{universe} Universe</h1>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex gap-4 flex-wrap">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search characters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700
                       focus:ring-2 focus:ring-green-400 focus:border-transparent
                       transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy || ''}
              onChange={(e) => setSortBy(e.target.value || null)}
              className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700
                       focus:ring-2 focus:ring-green-400 focus:border-transparent
                       transition-all duration-300"
            >
              <option value="">Sort by...</option>
              <option value="strength">Strength</option>
              <option value="speed">Speed</option>
              <option value="intelligence">Intelligence</option>
              <option value="durability">Durability</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                showFilters ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-300'
              }`}
              aria-label="Toggle filters"
              aria-expanded={showFilters}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 bg-gray-800 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Filter by Minimum Stats</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(statIcons).map(([stat, Icon]) => (
                  <div key={stat} className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-gray-300">
                      <Icon className="w-4 h-4" />
                      Min {stat.charAt(0).toUpperCase() + stat.slice(1)}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filters[`min${stat.charAt(0).toUpperCase() + stat.slice(1)}`]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        [`min${stat.charAt(0).toUpperCase() + stat.slice(1)}`]: parseInt(e.target.value)
                      }))}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-400 text-right">
                      {filters[`min${stat.charAt(0).toUpperCase() + stat.slice(1)}`]}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setFilters({
                    minStrength: 0,
                    minSpeed: 0,
                    minIntelligence: 0,
                    minDurability: 0
                  })}
                  className="px-4 py-2 text-sm bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Character Selection */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Choose Your Character</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredCharacters.map((character) => (
                  <CharacterCard
                    key={character._id}
                    character={character}
                    isSelected={selectedCharacter?._id === character._id}
                    onSelect={() => handleCharacterSelect(character)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Opponent Selection */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Choose Your Opponent</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredCharacters
                  .filter(char => char._id !== selectedCharacter?._id)
                  .map((character) => (
                    <CharacterCard
                      key={character._id}
                      character={character}
                      isSelected={opponentCharacter?._id === character._id}
                      onSelect={() => handleOpponentSelect(character)}
                    />
                  ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Character Comparison and Fight Button */}
        {selectedCharacter && opponentCharacter && (
          <>
            <CharacterComparison 
              character1={selectedCharacter} 
              character2={opponentCharacter} 
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4"
            >
              <button
                onClick={handleSwapCharacters}
                className="p-4 bg-gray-700 text-white rounded-full hover:bg-gray-600
                         transition-colors duration-300"
                aria-label="Swap Characters"
              >
                <ArrowLeftRight className="w-6 h-6" />
              </button>
              <button
                onClick={handleStartFight}
                className="flex items-center space-x-2 px-8 py-4 bg-green-500 text-white
                         rounded-full text-xl font-bold hover:bg-green-600 
                         transition-colors duration-300"
              >
                <Swords className="w-6 h-6" />
                <span>Start Fight!</span>
              </button>
            </motion.div>
          </>
        )}
      </div>
    </motion.main>
  );
};

// PropTypes definitions...
CharacterSelection.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  universe: PropTypes.string.isRequired
};

export default CharacterSelection;