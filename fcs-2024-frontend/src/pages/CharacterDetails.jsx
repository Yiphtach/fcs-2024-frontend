import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  ArrowLeft, 
  Shield, 
  Zap, 
  Brain, 
  Swords,
  Trophy,
  Users
} from 'lucide-react';

const statIcons = {
  strength: Swords,
  speed: Zap,
  intelligence: Brain,
  durability: Shield
};

const StatBar = ({ label, value, Icon, color }) => (
  <div className="flex items-center gap-4">
    <span className="font-medium capitalize flex items-center gap-2 text-gray-200">
      <Icon className={`w-5 h-5 ${color}`} />
      {label}:
    </span>
    <div className="flex-1 flex items-center">
      <div className="w-full bg-gray-700 rounded-full h-2.5 mr-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`${color} h-2.5 rounded-full`}
        />
      </div>
      <span className="min-w-[2.5rem] text-right text-gray-200">{value}</span>
    </div>
  </div>
);

StatBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  Icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired
};

<StatBar
    current={75}
    max={100}
    label="Health"
    color="bg-green-500"  // Using Tailwind color classes
/>

const LoadingState = () => (
  <div className="container mx-auto p-4 text-center">
    <div className="animate-pulse space-y-8">
      <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto"></div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="h-64 bg-gray-700 rounded"></div>
          <div className="h-20 bg-gray-700 rounded"></div>
        </div>
        <div className="space-y-4">
          <div className="h-40 bg-gray-700 rounded"></div>
          <div className="h-40 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

const CharacterDetails = ({ character }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showFullImage, setShowFullImage] = useState(false);

  useEffect(() => {
    if (character) {
      setIsLoading(false);
    }
  }, [character]);

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

  const {
    name,
    imageUrl,
    universe,
    stats,
    totalFights,
    wins,
    losses
  } = character;

  const winRate = totalFights > 0 
    ? ((wins / totalFights) * 100).toFixed(1) 
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-900 p-4"
    >
      <div className="container mx-auto max-w-3xl">
        <Card className="bg-gray-800 text-white border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <CardTitle className="text-3xl font-bold">
                {name}
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="relative group">
                  <motion.img 
                    src={imageUrl} 
                    alt={name}
                    className="w-full rounded-lg shadow-lg cursor-pointer"
                    onClick={() => setShowFullImage(true)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">Information</h2>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300">Universe:</span>
                      <span className="text-white">{universe}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-300">Rank:</span>
                      <span className="text-white">{Math.floor(winRate * totalFights / 100)}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Stats</h2>
                  <div className="space-y-4">
                    <StatBar 
                      label="Strength"
                      value={stats.strength}
                      Icon={statIcons.strength}
                      color="text-red-400"
                    />
                    <StatBar 
                      label="Speed"
                      value={stats.speed}
                      Icon={statIcons.speed}
                      color="text-blue-400"
                    />
                    <StatBar 
                      label="Intelligence"
                      value={stats.intelligence}
                      Icon={statIcons.intelligence}
                      color="text-purple-400"
                    />
                    <StatBar 
                      label="Durability"
                      value={stats.durability}
                      Icon={statIcons.durability}
                      color="text-yellow-400"
                    />
                  </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Fight Record</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <div className="bg-gray-800 p-4 rounded-lg text-center">
                        <p className="text-gray-400">Win Rate</p>
                        <p className="text-3xl font-bold text-blue-400">{winRate}%</p>
                        <p className="text-sm text-gray-400">
                          Based on {totalFights} total fights
                        </p>
                      </div>
                    </div>
                    <div className="bg-green-900/20 p-4 rounded-lg text-center">
                      <p className="text-green-400">Wins</p>
                      <p className="text-3xl font-bold text-green-400">{wins}</p>
                    </div>
                    <div className="bg-red-900/20 p-4 rounded-lg text-center">
                      <p className="text-red-400">Losses</p>
                      <p className="text-3xl font-bold text-red-400">{losses}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => navigate('/fights')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Swords className="w-5 h-5" />
                Start a Fight
              </button>
              <button
                onClick={() => navigate('/leaderboards')}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <Trophy className="w-5 h-5" />
                View Leaderboard
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Full Image Modal */}
      {showFullImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
          onClick={() => setShowFullImage(false)}
        >
          <img
            src={imageUrl}
            alt={name}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

CharacterDetails.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    universe: PropTypes.string.isRequired,
    stats: PropTypes.shape({
      strength: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
      intelligence: PropTypes.number.isRequired,
      durability: PropTypes.number.isRequired
    }).isRequired,
    totalFights: PropTypes.number.isRequired,
    wins: PropTypes.number.isRequired,
    losses: PropTypes.number.isRequired
  })
};

export default CharacterDetails;