// Leaderboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { fetchLeaderboard } from '../../utils/ApiFetcher';
import LeaderboardRow from './LeaderboardRow';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [sortBy, setSortBy] = useState('winRatio');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLeaderboard().then(data => setLeaderboard(data.leaderboard || []));
    }, []);

    // Sorting Logic
    const sortedCharacters = [...leaderboard].sort((a, b) => {
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

    // Pagination Logic
    const charactersPerPage = 5;
    const totalPages = Math.ceil(sortedCharacters.length / charactersPerPage);
    const displayedCharacters = sortedCharacters.slice((currentPage - 1) * charactersPerPage, currentPage * charactersPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            navigate(`/leaderboard?page=${page}`);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gray-900 text-white p-8"
        >
            <h2 className="text-center text-3xl font-bold mb-6">🏆 Leaderboard</h2>

            {/* Sorting Buttons */}
            <div className="flex justify-center gap-4 mb-4">
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

            {/* Leaderboard Table */}
            <div className="max-w-4xl mx-auto bg-primary text-white p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-center mb-4">🏆 Leaderboard</h2>
            <table className="w-full border-collapse border border-gray-600">
                <thead>
                    <tr className="bg-secondary text-white">
                        <th className="py-2 px-4 border border-gray-500">Rank</th>
                        <th className="py-2 px-4 border border-gray-500">Character</th>
                        <th className="py-2 px-4 border border-gray-500">Wins</th>
                        <th className="py-2 px-4 border border-gray-500">Total Fights</th>
                        <th className="py-2 px-4 border border-gray-500">Win Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedCharacters.map((character, index) => (
                        <LeaderboardRow 
                            key={character._id} 
                            rank={(currentPage - 1) * charactersPerPage + index + 1} 
                            character={character} 
                        />
                    ))}
                </tbody>
            </table>
        </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </motion.div>
    );
};

// ✅ Prop Validation
Leaderboard.propTypes = {
    characters: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            universe: PropTypes.string,
            wins: PropTypes.number.isRequired,
            losses: PropTypes.number.isRequired,
            totalFights: PropTypes.number.isRequired,
        })
    )
};

export default Leaderboard;
