import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Loader
} from 'lucide-react';
import { fetchCharacterById, fetchCharacterPowerstats } from '../utils/ApiFetcher';

const LoadingState = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <Loader className="w-8 h-8 text-blue-500 animate-spin" />
  </div>
);


const CharacterDetails = () => {
  const { id } = useParams(); // Get the character ID from URL
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const loadCharacterData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch character basic info and powerstats in parallel
        const [characterData, powerStats] = await Promise.all([
          fetchCharacterById(id),
          fetchCharacterPowerstats(id)
        ]);

        // Transform API data to match component's expected format
        const transformedCharacter = {
          name: characterData.name,
          imageUrl: characterData.image?.url,
          universe: characterData.biography?.publisher || 'Unknown',
          stats: {
            strength: parseInt(powerStats.strength) || 0,
            speed: parseInt(powerStats.speed) || 0,
            intelligence: parseInt(powerStats.intelligence) || 0,
            durability: parseInt(powerStats.durability) || 0
          },
          // fetch these from your backend later
          totalFights: 0,
          wins: 0,
          losses: 0
        };

        setCharacter(transformedCharacter);
      } catch (err) {
        console.error('Error loading character:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadCharacterData();
    }
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error loading character</h1>
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => navigate('/characters')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Characters
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Character not found</h1>
          <button
            onClick={() => navigate('/characters')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Characters
          </button>
        </div>
      </div>
    );
  }

  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-900 p-4"
    >
      {/* ... [Rest of the JSX remains the same] ... */}
    </motion.div>
  );
};

export default CharacterDetails;