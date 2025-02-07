import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { 
  Trophy, 
  ChevronLeft, 
  ChevronRight, 
  Medal,
  Swords,
  Users
} from 'lucide-react';

const LeaderboardRow = ({ character, rank }) => {
  const winRatio = character.totalFights > 0
    ? ((character.wins / character.totalFights) * 100).toFixed(2)
    : '0.00';

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-gray-700"
    >
      <td className="p-4 text-center">
        {rank <= 3 ? (
          <div className="flex justify-center">
            <Medal className={`w-6 h-6 ${
              rank === 1 ? 'text-yellow-400' :
              rank === 2 ? 'text-gray-400' :
              'text-orange-400'
            }`} />
          </div>
        ) : (
          <span className="text-gray-400">#{rank}</span>
        )}
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <img
            src={character.imageUrl}
            alt={character.name}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              e.target.src = '/default-avatar.jpg';
            }}
          />
          <div>
            <div className="font-medium">{character.name}</div>
            <div className="text-sm text-gray-400">{character.universe}</div>
          </div>
        </div>
      </td>
      <td className="p-4 text-center text-green-400">{character.wins}</td>
      <td className="p-4 text-center text-red-400">{character.losses}</td>
      <td className="p-4 text-center">{character.totalFights}</td>
      <td className="p-4 text-center">
        <div className={`font-medium ${
          parseFloat(winRatio) >= 50 ? 'text-green-400' : 'text-red-400'
        }`}>
          {winRatio}%
        </div>
      </td>
      <td className="p-4 text-center">
        <Link
          to={`/characters/${character._id}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          View Details
        </Link>
      </td>
    </motion.tr>
  );
};

LeaderboardRow.propTypes = {
  character: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    universe: PropTypes.string,
    wins: PropTypes.number.isRequired,
    losses: PropTypes.number.isRequired,
    totalFights: PropTypes.number.isRequired,
  }).isRequired,
  rank: PropTypes.number.isRequired,
};

const PaginationButton = ({ children, onClick, disabled, active }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      px-4 py-2 rounded-lg transition-colors
      ${active 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
  >
    {children}
  </button>
);

PaginationButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

const Leaderboard = ({ characters, currentPage, totalPages }) => {
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-2 bg-yellow-500 rounded-full mb-4">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Character Leaderboard</h1>
          <p className="text-xl text-gray-400">
            Top fighters ranked by performance
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">{characters.length}</div>
            <div className="text-gray-400">Total Characters</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <Swords className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {characters.reduce((sum, char) => sum + char.totalFights, 0)}
            </div>
            <div className="text-gray-400">Total Fights</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {characters.reduce((sum, char) => sum + char.wins, 0)}
            </div>
            <div className="text-gray-400">Total Victories</div>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex justify-end mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="winRatio">Sort by Win Ratio</option>
            <option value="wins">Sort by Wins</option>
            <option value="totalFights">Sort by Total Fights</option>
          </select>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-gray-800 rounded-xl overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-4 text-left">Rank</th>
                  <th className="p-4 text-left">Character</th>
                  <th className="p-4 text-center">Wins</th>
                  <th className="p-4 text-center">Losses</th>
                  <th className="p-4 text-center">Total Fights</th>
                  <th className="p-4 text-center">Win Ratio</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedCharacters.map((character, index) => (
                  <LeaderboardRow
                    key={character._id}
                    character={character}
                    rank={(currentPage - 1) * 30 + index + 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          <PaginationButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-5 h-5" />
          </PaginationButton>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => (
              page === 1 ||
              page === totalPages ||
              Math.abs(page - currentPage) <= 2
            ))
            .map((page, index, array) => (
              <React.Fragment key={page}>
                {index > 0 && array[index - 1] !== page - 1 && (
                  <span className="px-4 py-2 text-gray-400">...</span>
                )}
                <PaginationButton
                  onClick={() => handlePageChange(page)}
                  active={currentPage === page}
                >
                  {page}
                </PaginationButton>
              </React.Fragment>
            ))}
          
          <PaginationButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-5 h-5" />
          </PaginationButton>
        </div>
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
  ).isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Leaderboard;