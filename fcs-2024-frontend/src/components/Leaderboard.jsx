// Leaderboard.jsx
import { useState } from 'react';
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
      {/* ... Rest of your JSX ... */}
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