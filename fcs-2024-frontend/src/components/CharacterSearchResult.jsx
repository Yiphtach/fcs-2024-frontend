// src/components/CharacterSearchResult.jsx
import { useCharacterContext } from '../context/CharacterContext';
import PropTypes from 'prop-types';

export const CharacterSearchResult = ({ character }) => {
    const { 
      addToRecentlyViewed, 
      toggleFavorite, 
      favorites,
      selectCharacter,
      selectedCharacters
    } = useCharacterContext();
  
    const isFavorite = favorites.some(fav => fav.id === character.id);
    const isSelected = selectedCharacters.some(char => char.id === character.id);
  
    const handleSelect = () => {
      if (!isSelected) {
        selectCharacter(character);
        addToRecentlyViewed(character);
      }
    };
  
    return (
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
        <img 
          src={character.image?.url} 
          alt={character.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex-1">
          <h3 className="font-bold">{character.name}</h3>
          <p className="text-sm text-gray-600">{character.biography?.publisher}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toggleFavorite(character)}
            className={`p-2 rounded ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200'
            }`}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
          <button
            onClick={handleSelect}
            disabled={isSelected}
            className={`px-4 py-2 rounded ${
              isSelected 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    );
    };
  
  CharacterSearchResult.propTypes = {
    character: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.shape({
        url: PropTypes.string
      }),
      biography: PropTypes.shape({
        publisher: PropTypes.string
      })
    }).isRequired
  };