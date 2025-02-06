import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Swords } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * @typedef {Object} Character
 * @property {string} _id
 * @property {string} name
 * @property {string} imageUrl
 * @property {string} universe
 * @property {Object} stats
 * @property {number} stats.strength
 * @property {number} stats.speed
 * @property {number} stats.intelligence
 * @property {number} stats.durability
 */

/**
 * @param {Object} props
 * @param {Character[]} props.characters
 * @param {string} props.universe
 */
const CharacterSelection = ({ characters, universe }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [opponentCharacter, setOpponentCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredCharacters = characters.filter(char => 
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    // Reset opponent if they selected the same character
    if (opponentCharacter?._id === character._id) {
      setOpponentCharacter(null);
    }
  };

  const handleOpponentSelect = (character) => {
    setOpponentCharacter(character);
  };

  const handleStartFight = () => {
    if (selectedCharacter && opponentCharacter) {
      navigate('/fights/simulate', {
        state: {
          char1Id: selectedCharacter._id,
          char2Id: opponentCharacter._id
        }
      });
    }
  };

  const CharacterCard = ({ character, isSelected, onSelect }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative rounded-xl overflow-hidden cursor-pointer
        transition-all duration-300 bg-gray-800
        ${isSelected ? 'ring-4 ring-green-400' : 'hover:ring-2 hover:ring-green-400/50'}
      `}
      onClick={onSelect}
    >
      <div className="aspect-w-3 aspect-h-4">
        <img
          src={character.imageUrl}
          alt={character.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4 bg-gradient-to-t from-black/80 to-transparent absolute bottom-0 w-full">
        <h3 className="text-xl font-bold text-white mb-2">{character.name}</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-green-400">STR: {character.stats.strength}</div>
          <div className="text-blue-400">SPD: {character.stats.speed}</div>
          <div className="text-purple-400">INT: {character.stats.intelligence}</div>
          <div className="text-yellow-400">DUR: {character.stats.durability}</div>
        </div>
      </div>
    </motion.div>
  );

  const CharacterCardPropTypes = {
      character: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        stats: PropTypes.shape({
          strength: PropTypes.number.isRequired,
          speed: PropTypes.number.isRequired,
          intelligence: PropTypes.number.isRequired,
          durability: PropTypes.number.isRequired
        }).isRequired,
        universe: PropTypes.string.isRequired
      }).isRequired,
      isSelected: PropTypes.bool.isRequired,
      onSelect: PropTypes.func.isRequired,
      key: PropTypes.string
  };
  CharacterCard.propTypes = CharacterCardPropTypes;

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

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search characters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 border border-gray-700
                     focus:ring-2 focus:ring-green-400 focus:border-transparent
                     transition-all duration-300"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Character Selection */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Choose Your Character</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredCharacters.map((character) => (
                  <CharacterCard
                    // eslint-disable-next-line react/prop-types
                    key={character._id}
                    character={character}
                    // eslint-disable-next-line react/prop-types
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
                      // eslint-disable-next-line react/prop-types
                      key={character._id}
                      character={character}
                      // eslint-disable-next-line react/prop-types
                      isSelected={opponentCharacter?._id === character._id}
                      onSelect={() => handleOpponentSelect(character)}
                    />
                  ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Fight Button */}
        {selectedCharacter && opponentCharacter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
          >
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
        )}
      </div>
    </motion.main>
  );
};
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