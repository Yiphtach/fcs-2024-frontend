// Leaderboard.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';


const Leaderboard = ({ characters = [], currentPage = 1, totalPages = 1 }) => {
  const [sortBy, setSortBy] = useState('winRatio');
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    navigate(`/leaderboards?page=${page}`);
  };

  const sortedCharacters = [...characters].sort((a, b) => {
    const aRatio = a.totalFights > 0 ? (a.wins / a.totalFights) : 0;
    const bRatio = b.totalFights > 0 ? (b.wins / b.totalFights) : 0;
    
    switch (sortBy) {
      case 'wins':
        return b.wins - a.wins;
      case 'totalFights':
        return b.totalFights - a.totalFights;
      case 'winRatio':
      default:
        return bRatio - aRatio;
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-900 text-white p-8"
    >
      <div>Current Page: {currentPage}</div>
      <div className="mt-4 flex justify-center gap-2 mb-4">
        <button
          onClick={() => setSortBy('winRatio')}
          className={`px-4 py-2 rounded ${sortBy === 'winRatio' ? 'bg-blue-600' : 'bg-blue-800'}`}
        >
          Win Ratio
        </button>
        <button
          onClick={() => setSortBy('wins')}
          className={`px-4 py-2 rounded ${sortBy === 'wins' ? 'bg-blue-600' : 'bg-blue-800'}`}
        >
          Total Wins
        </button>
        <button
          onClick={() => setSortBy('totalFights')}
          className={`px-4 py-2 rounded ${sortBy === 'totalFights' ? 'bg-blue-600' : 'bg-blue-800'}`}
        >
          Total Fights
        </button>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {sortedCharacters.map((character) => (
          <div key={character._id} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-bold">{character.name}</h3>
            <p>Universe: {character.universe}</p>
            <p>Wins: {character.wins}</p>
            <p>Total Fights: {character.totalFights}</p>
            <p>Win Ratio: {((character.wins / character.totalFights) * 100).toFixed(1)}%</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

Leaderboard.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
      universe: PropTypes.string,
      wins: PropTypes.number.isRequired,
      losses: PropTypes.number.isRequired,
      totalFights: PropTypes.number.isRequired,
    })
  ),
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
};

Leaderboard.defaultProps = {
  characters: [],
  currentPage: 1,
  totalPages: 1
};

export default Leaderboard;