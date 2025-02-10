import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Leaderboard from '../components/Leaderboard/Leaderboard'; // Assuming you'll split the components

const LeaderboardsPage = () => {
  const [searchParams] = useSearchParams();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    setCurrentPage(page);

    // Temporary mock data for development
    const mockCharacters = [
      {
        _id: '1',
        name: 'Spider-Man',
        imageUrl: '/characters/spiderman.jpg',
        universe: 'Marvel',
        wins: 150,
        losses: 50,
        totalFights: 200
      },
      {
        _id: '2',
        name: 'Batman',
        imageUrl: '/characters/batman.jpg',
        universe: 'DC',
        wins: 180,
        losses: 20,
        totalFights: 200
      },
      // Add more mock characters as needed
    ];

    // Simulate API call
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        // In production, replace this with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        setCharacters(mockCharacters);
        setTotalPages(5); // Mock total pages
      } catch (err) {
        setError('Failed to load leaderboard data');
        console.error('Error loading leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <Leaderboard
      characters={characters}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
};

export default LeaderboardsPage;