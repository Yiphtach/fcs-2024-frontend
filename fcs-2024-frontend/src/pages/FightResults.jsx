import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Swords, 
  Share2, 
  Shield, 
  Zap, 
  Brain,
  Target,
  Star,
  AlertTriangle
} from 'lucide-react';
import PropTypes from 'prop-types';

// Stat Bar Component
const StatBar = ({ label, value, maxValue, color, icon: Icon }) => (
  <div className="space-y-1">
    <div className="flex justify-between items-center text-sm">
      <span className="flex items-center gap-2">
        {Icon && <Icon className={`w-4 h-4 ${color}`} />}
        {label}
      </span>
      <span>{value}</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(value / maxValue) * 100}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  </div>
);

StatBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.elementType
};

// Fighter Stats Card Component
const FighterCard = ({ fighter, status, stats, specialMoves, criticalHits }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-800 rounded-xl p-6 h-full"
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="relative">
        <img
          src={fighter.imageUrl}
          alt={fighter.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute -top-2 -right-2 p-2 rounded-full
            ${status === 'Winner' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {status === 'Winner' ? (
            <Trophy className="w-4 h-4 text-white" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-white" />
          )}
        </motion.div>
      </div>
      <div>
        <h2 className="text-2xl font-bold">{fighter.name}</h2>
        <p className={status === 'Winner' ? 'text-green-400' : 'text-red-400'}>
          {status}
        </p>
        <p className="text-sm text-gray-400">{fighter.universe}</p>
      </div>
    </div>

    <div className="space-y-4">
      <StatBar 
        label="Strength" 
        value={stats.strength} 
        maxValue={100} 
        color="text-red-500"
        icon={Swords}
      />
      <StatBar 
        label="Speed" 
        value={stats.speed} 
        maxValue={100} 
        color="text-blue-500"
        icon={Zap}
      />
      <StatBar 
        label="Intelligence" 
        value={stats.intelligence} 
        maxValue={100} 
        color="text-purple-500"
        icon={Brain}
      />
      <StatBar 
        label="Durability" 
        value={stats.durability} 
        maxValue={100} 
        color="text-yellow-500"
        icon={Shield}
      />
    </div>

    <div className="mt-6 grid grid-cols-2 gap-4">
      <div className="bg-gray-700 rounded-lg p-4 text-center">
        <div className="flex justify-center mb-2">
          <Star className="w-5 h-5 text-yellow-400" />
        </div>
        <p className="text-sm text-gray-300">Special Moves</p>
        <p className="text-xl font-bold">{specialMoves}</p>
      </div>
      <div className="bg-gray-700 rounded-lg p-4 text-center">
        <div className="flex justify-center mb-2">
          <Target className="w-5 h-5 text-red-400" />
        </div>
        <p className="text-sm text-gray-300">Critical Hits</p>
        <p className="text-xl font-bold">{criticalHits}</p>
      </div>
    </div>
  </motion.div>
);

FighterCard.propTypes = {
  fighter: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    universe: PropTypes.string.isRequired
  }).isRequired,
  status: PropTypes.oneOf(['Winner', 'Defeated']).isRequired,
  stats: PropTypes.shape({
    strength: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    intelligence: PropTypes.number.isRequired,
    durability: PropTypes.number.isRequired
  }).isRequired,
  specialMoves: PropTypes.number.isRequired,
  criticalHits: PropTypes.number.isRequired
};

// Round Detail Component
const RoundDetail = ({ round, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
  >
    <h3 className="font-bold mb-2 flex items-center gap-2">
      <span className="bg-gray-800 px-2 py-1 rounded text-sm">
        Round {round.round}
      </span>
    </h3>
    <p className="text-gray-300">{round.description}</p>
    <div className="mt-4 grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-gray-400 mb-1">Health</p>
        <div className="space-y-2">
          <StatBar 
            label="Fighter 1" 
            value={round.remainingHealth.fighter1} 
            maxValue={100} 
            color="text-green-500" 
          />
          <StatBar 
            label="Fighter 2" 
            value={round.remainingHealth.fighter2} 
            maxValue={100} 
            color="text-green-500" 
          />
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg p-3">
        <p className="text-sm text-gray-400">Damage Dealt</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">{round.damage.amount}</span>
          <span className="text-sm text-gray-400">pts</span>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          Type: {round.damage.type}
        </p>
      </div>
    </div>
  </motion.div>
);

RoundDetail.propTypes = {
  round: PropTypes.shape({
    round: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    damage: PropTypes.shape({
      amount: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired
    }).isRequired,
    remainingHealth: PropTypes.shape({
      fighter1: PropTypes.number.isRequired,
      fighter2: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  delay: PropTypes.number.isRequired
};

const FightResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(location.state?.result || {});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state and update result if needed
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
        // Show toast notification here
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (!result.winner || !result.loser) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Fight Results Available</h1>
          <button
            onClick={() => navigate('/fights')}
            className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Start New Fight
          </button>
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
          <div className="flex justify-end gap-4 mb-4">
            <button
              onClick={handleRematch}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
            >
              <Swords className="w-5 h-5" />
              Rematch
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
            >
              <Share2 className="w-5 h-5" />
              Share Results
            </button>
          </div>
          {/* Rest of your JSX */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FightResults;