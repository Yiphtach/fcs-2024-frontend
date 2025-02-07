// Characters.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterList from '../components/CharacterList';
import { fetchCharacterById } from '../utils/ApiFetcher';

const Characters = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Number of characters per page
  const PAGE_SIZE = 10;

  useEffect(() => {
    loadCharacters();
  }, [currentPage]);

  const loadCharacters = async () => {
    try {
      setLoading(true);
      setError(null);

      // For demonstration, let's load some sample characters
      // In production, this would be replaced with your actual API call
      const sampleIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      const charactersData = await Promise.all(
        sampleIds.map(async (id) => {
          const characterData = await fetchCharacterById(id);
          const transformedCharacter = {
            _id: id,
            name: characterData.name,
            universe: characterData.biography?.publisher || 'Unknown',
            stats: {
              strength: parseInt(characterData.powerstats?.strength) || 0,
              speed: parseInt(characterData.powerstats?.speed) || 0,
              durability: parseInt(characterData.powerstats?.durability) || 0,
              power: parseInt(characterData.powerstats?.power) || 0,
              combat: parseInt(characterData.powerstats?.combat) || 0,
              intelligence: parseInt(characterData.powerstats?.intelligence) || 0
            },
            wins: 0, // These would come from your backend
            losses: 0,
            totalFights: 0,
            winRatio: 0,
            lossRatio: 0
          };
          return transformedCharacter;
        })
      );

      setCharacters(charactersData);
      // In a real application, total pages would come from the API
      setTotalPages(Math.ceil(charactersData.length / PAGE_SIZE));
    } catch (err) {
      console.error('Error loading characters:', err);
      setError('Failed to load characters. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (characterId) => {
    navigate(`/character/${characterId}`);
  };

  const handleDelete = async (characterId) => {
    try {
      // In a real application, you would call your API to delete the character
      // await deleteCharacter(characterId);
      
      // Remove character from local state
      setCharacters(prevCharacters => 
        prevCharacters.filter(char => char._id !== characterId)
      );
    } catch (err) {
      console.error('Error deleting character:', err);
      setError('Failed to delete character. Please try again later.');
    }
  };

  const handleCreateNew = () => {
    navigate('/character-selection');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={loadCharacters}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Calculate the current page's characters
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentCharacters = characters.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <CharacterList
        characters={currentCharacters}
        currentPage={currentPage}
        totalPages={totalPages}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        onCreateNew={handleCreateNew}
      />
    </div>
  );
};

export default Characters;