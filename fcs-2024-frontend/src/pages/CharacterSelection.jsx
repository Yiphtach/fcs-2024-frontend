// src/Pages/CharacterSelections.jsx
import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Swords, 
  Search, 
  X, 
  Filter
} from 'lucide-react';
import CharacterCard from '../Components/CharacterCard';
import { RecentlyViewed } from '../Components/RecentlyViewed';
import { SelectedCharacters } from '../Components/SelectedCharacters';
import { useCharacterContext } from '../context/CharacterContext';
import { useAPIRequest } from '../utils/apiFetcher';

const statIcons = {
  strength: Swords,
  speed: Swords, 
  intelligence: Swords,  
  durability: Swords 
};

const CharacterSelections = () => {
  const navigate = useNavigate();
  const { 
    selectedCharacters, 
    selectCharacter, 
    deselectCharacter,
    addToRecentlyViewed 
  } = useCharacterContext();

  // Local state for UI
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minStrength: 0,
    minSpeed: 0,
    minIntelligence: 0,
    minDurability: 0
  });

  // Fetch characters data
  const { data: characters = [] } = useAPIRequest('fetchCharacters');

  // Memoized filtered and sorted characters
  const filteredCharacters = useMemo(() => {
    if (!characters) return [];

    let result = characters.filter(char => {
      const nameMatch = char.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const meetsMinStats = 
        parseInt(char.powerstats.strength) >= filters.minStrength &&
        parseInt(char.powerstats.speed) >= filters.minSpeed &&
        parseInt(char.powerstats.intelligence) >= filters.minIntelligence &&
        parseInt(char.powerstats.durability) >= filters.minDurability;
      
      return nameMatch && meetsMinStats;
    });

    if (sortBy) {
      result = [...result].sort((a, b) => 
        parseInt(b.powerstats[sortBy]) - parseInt(a.powerstats[sortBy])
      );
    }

    return result;
  }, [characters, searchTerm, sortBy, filters]);

  const handleCharacterSelect = useCallback((character) => {
    const isSelected = selectedCharacters.some(char => char.id === character.id);
    if (isSelected) {
      deselectCharacter(character);
    } else if (selectedCharacters.length < 2) {
      selectCharacter(character);
      addToRecentlyViewed(character);
    }
  }, [selectedCharacters, selectCharacter, deselectCharacter, addToRecentlyViewed]);

  const handleProceedToFight = useCallback(() => {
    if (selectedCharacters.length === 2) {
      navigate('/fight-setup', {
        state: {
          char1Id: selectedCharacters[0].id,
          char2Id: selectedCharacters[1].id
        }
      });
    }
  }, [selectedCharacters, navigate]);

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
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold">Character Selection</h1>
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
                    <span className="text-sm text-gray-400">
                      {filters[`min${stat.charAt(0).toUpperCase() + stat.slice(1)}`]}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Characters */}
        <SelectedCharacters />

        {/* Character Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
          <AnimatePresence>
            {filteredCharacters.map((character) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <CharacterCard
                  character={character}
                  isSelected={selectedCharacters.some(char => char.id === character.id)}
                  onSelect={() => handleCharacterSelect(character)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Fight Button */}
        {selectedCharacters.length === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <button
              onClick={handleProceedToFight}
              className="flex items-center space-x-2 px-8 py-4 bg-green-500 text-white
                       rounded-full text-xl font-bold hover:bg-green-600 
                       transition-colors duration-300"
            >
              <Swords className="w-6 h-6" />
              <span>Start Fight!</span>
            </button>
          </motion.div>
        )}

        {/* Recently Viewed */}
        <RecentlyViewed />
      </div>
    </motion.main>
  );
};

export default CharacterSelections;