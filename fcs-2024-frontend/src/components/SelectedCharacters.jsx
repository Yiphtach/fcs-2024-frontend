// src/components/SelectedCharacters.jsx
import { CharacterSearchResult } from './components/CharacterSearchResult';
import { useCharacterContext } from '../context/CharacterContext';
export const SelectedCharacters = () => {
    const { selectedCharacters, clearSelected } = useCharacterContext();
  
    if (selectedCharacters.length === 0) {
      return null;
    }
  
    return (
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Selected Characters</h2>
          <button
            onClick={clearSelected}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear All
          </button>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {selectedCharacters.map(character => (
            <CharacterSearchResult key={character.id} character={character} />
          ))}
        </div>
      </div>
    );
  };