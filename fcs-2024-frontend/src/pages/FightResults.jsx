import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Swords, Share2, Home } from 'lucide-react';
import PropTypes from 'prop-types';
import { FighterCard } from '../components/fight/FighterCard';
import { RoundDetail } from '../components/fight/RoundDetail';
import { StatBar } from '../components/fight/StatBar';

const FightResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(location.state?.result || {});
  const [isLoading, setIsLoading] = useState(true);
  const [shareNotification, setShareNotification] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!location.state?.result) {
        setResult({});
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [location.state?.result]);

  const handleRematch = () => {
    navigate('/fights/simulate', {
      state: {
        char1Id: result.loser.id,
        char2Id: result.winner.id,
        isRematch: true
      }
    });
  };

  const handleShare = async () => {
    const shareText = `Epic battle between ${result.winner.name} and ${result.loser.name}! ${result.winner.name} emerged victorious after ${result.rounds} intense rounds!`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Fight Simulation Results',
          text: shareText,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setShareNotification('Results copied to clipboard!');
        setTimeout(() => setShareNotification(''), 3000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      setShareNotification('Failed to share results');
      setTimeout(() => setShareNotification(''), 3000);
    }
  };

  if (!result.winner || !result.loser) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Fight Results Available</h1>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/fights')}
              className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors w-full"
            >
              Start New Fight
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors w-full"
            >
              <Home className="w-5 h-5" />
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-gray-900 flex items-center justify-center"
        >
          <div className="loading-spinner" />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-gray-900 text-white p-8"
        >
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-block p-2 bg-yellow-500 rounded-full mb-4">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4">
                {result.winner.name} Emerges Victorious!
              </h1>
              <p className="text-xl text-gray-400">
                In an epic {result.rounds}-round battle
              </p>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={handleRematch}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Swords className="w-5 h-5" />
                Rematch
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Share Results
              </button>
              <button
                onClick={() => navigate('/fights')}
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Swords className="w-5 h-5" />
                New Fight
              </button>
            </div>

            {/* Share Notification */}
            <AnimatePresence>
              {shareNotification && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="fixed bottom-8 right-8 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg"
                >
                  {shareNotification}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Fighters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <FighterCard
                fighter={result.winner}
                status="Winner"
                stats={result.winner.stats}
                specialMoves={result.specialMoves.winner}
                criticalHits={result.criticalHits.winner}
              />
              <FighterCard
                fighter={result.loser}
                status="Defeated"
                stats={result.loser.stats}
                specialMoves={result.specialMoves.loser}
                criticalHits={result.criticalHits.loser}
              />
            </div>

            {/* Round by Round Breakdown */}
            <div className="bg-gray-800 rounded-xl p-6 mb-12">
              <h2 className="text-2xl font-bold mb-6">Round by Round Breakdown</h2>
              <div className="space-y-4">
                {result.roundDetails.map((round, index) => (
                  <RoundDetail
                    key={round.round}
                    round={round}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>

            {/* Final Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <p className="text-gray-400 mb-1">Total Rounds</p>
                <p className="text-2xl font-bold">{result.rounds}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <p className="text-gray-400 mb-1">Fight Duration</p>
                <p className="text-2xl font-bold">{result.duration}s</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <p className="text-gray-400 mb-1">Critical Hits</p>
                <p className="text-2xl font-bold">
                  {result.criticalHits.winner + result.criticalHits.loser}
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <p className="text-gray-400 mb-1">Special Moves</p>
                <p className="text-2xl font-bold">
                  {result.specialMoves.winner + result.specialMoves.loser}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

StatBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  color: PropTypes.string
};


export default FightResults;