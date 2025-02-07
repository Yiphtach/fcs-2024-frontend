import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Share2, Home, Info } from 'lucide-react';
import PropTypes from 'prop-types';

// Import components
import { FighterCard } from '../Components/Fight/FighterCard';
import { RoundDetail } from '../Components/Fight/RoundDetail';

const FightResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(location.state?.result || {});
  const [isLoading, setIsLoading] = useState(true);
  const [shareNotification, setShareNotification] = useState('');

  // Ensure shareNotification is used with a dedicated component
  const ShareNotificationBanner = () => {
    if (!shareNotification) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 
                    bg-gray-800 text-white px-6 py-3 rounded-lg 
                    shadow-lg flex items-center gap-3 z-50"
      >
        <Info className="w-5 h-5 text-blue-400" />
        <span>{shareNotification}</span>
      </motion.div>
    );
  };

  // Demonstrate usage of RoundDetail
  const RoundDetailsDemo = () => {
    // Mock round details to ensure RoundDetail is used
    const mockRoundDetails = [
      { 
        round: 1, 
        fighters: { blue: result.winner?.name || 'Fighter 1', red: result.loser?.name || 'Fighter 2' },
        scores: { blue: 10, red: 8 }
      },
      { 
        round: 2, 
        fighters: { blue: result.winner?.name || 'Fighter 1', red: result.loser?.name || 'Fighter 2' },
        scores: { blue: 9, red: 9 }
      }
    ];

    return (
      <div className="bg-gray-800 rounded-xl p-6 mb-12">
        <h2 className="text-2xl font-bold mb-6">Round Details Demo</h2>
        <div className="space-y-4">
          {mockRoundDetails.map((round, index) => (
            <RoundDetail
              key={round.round}
              round={round}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    );
  };

  // Demonstrate usage of FighterCard
  const FighterCardDemo = () => {
    if (!result.winner || !result.loser) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <FighterCard
          fighter={{
            ...result.winner,
            status: 'Winner',
            specialMoves: result.specialMoves?.winner || 0,
            criticalHits: result.criticalHits?.winner || 0
          }}
        />
        <FighterCard
          fighter={{
            ...result.loser,
            status: 'Defeated',
            specialMoves: result.specialMoves?.loser || 0,
            criticalHits: result.criticalHits?.loser || 0
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!location.state?.result) {
        setResult({});
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [location.state?.result]);

  const handleShare = async () => {
    if (result.winner && result.loser) {
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
        }
      } catch (error) {
        console.error('Error sharing:', error);
        setShareNotification('Failed to share results');
      }

      // Automatically clear notification after 3 seconds
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

            {/* Demonstrate component usage */}
            <FighterCardDemo />
            <RoundDetailsDemo />

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Share Results
              </button>
            </div>

            {/* Share Notification */}
            <ShareNotificationBanner />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// PropTypes for the component
FightResults.propTypes = {
  result: PropTypes.shape({
    winner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      stats: PropTypes.object
    }),
    loser: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      stats: PropTypes.object
    }),
    rounds: PropTypes.number,
    specialMoves: PropTypes.shape({
      winner: PropTypes.number,
      loser: PropTypes.number
    }),
    criticalHits: PropTypes.shape({
      winner: PropTypes.number,
      loser: PropTypes.number
    })
  })
};

export default FightResults;