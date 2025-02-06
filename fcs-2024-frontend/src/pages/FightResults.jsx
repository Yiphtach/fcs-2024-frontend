import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Clock, Swords, RotateCcw, Share2, Save } from 'lucide-react';

interface Fighter {
  id: string;
  name: string;
  imageUrl: string;
  universe: string;
  stats: {
    strength: number;
    speed: number;
    intelligence: number;
    durability: number;
  };
}

interface RoundDetail {
  round: number;
  description: string;
  damage: {
    attacker: string;
    defender: string;
    amount: number;
    type: string;
  };
  remainingHealth: {
    fighter1: number;
    fighter2: number;
  };
}

interface FightResult {
  winner: Fighter;
  loser: Fighter;
  duration: string;
  rounds: number;
  roundDetails: RoundDetail[];
  finalScore: {
    winner: number;
    loser: number;
  };
  specialMoves: {
    fighter1: number;
    fighter2: number;
  };
  criticalHits: {
    fighter1: number;
    fighter2: number;
  };
}

const FightResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentRound, setCurrentRound] = useState(0);
  const result: FightResult = location.state?.result || {};

  const handleRematch = () => {
    navigate('/fights/simulate', {
      state: {
        char1Id: result.loser.id,
        char2Id: result.winner.id,
        isRematch: true
      }
    });
  };

  const handleShare = () => {
    // Implementation for sharing results
    const shareText = `Epic battle between ${result.winner.name} and ${result.loser.name}! ${result.winner.name} emerged victorious!`;
    if (navigator.share) {
      navigator.share({
        title: 'Fight Simulation Results',
        text: shareText,
        url: window.location.href
      });
    }
  };

  const StatBar: React.FC<{ value: number; maxValue: number; color: string }> = ({ value, maxValue, color }) => (
    <div className="w-full bg-gray-700 rounded-full h-2">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(value / maxValue) * 100}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-900 text-white p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Winner Announcement */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-2 bg-yellow-500 rounded-full mb-4">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            {result.winner?.name} Emerges Victorious!
          </h1>
          <p className="text-xl text-gray-400">
            In an epic {result.rounds}-round battle
          </p>
        </motion.div>

        {/* Fight Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Winner Stats */}
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={result.winner?.imageUrl}
                alt={result.winner?.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold">{result.winner?.name}</h2>
                <p className="text-green-400">Winner</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Strength</span>
                  <span>{result.winner?.stats.strength}</span>
                </div>
                <StatBar value={result.winner?.stats.strength} maxValue={100} color="bg-red-500" />
              </div>
              {/* Add other stats similarly */}
            </div>
          </motion.div>

          {/* Loser Stats */}
          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            {/* Similar structure to winner stats */}
          </motion.div>
        </div>

        {/* Round by Round Breakdown */}
        <div className="bg-gray-800 rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6">Round by Round Breakdown</h2>
          <div className="space-y-4">
            {result.roundDetails?.map((round, index) => (
              <motion.div
                key={round.round}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700 rounded-lg p-4"
              >
                <h3 className="font-bold mb-2">Round {round.round}</h3>
                <p>{round.description}</p>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Remaining Health</p>
                    <StatBar 
                      value={round.remainingHealth.fighter1} 
                      maxValue={100} 
                      color="bg-green-500" 
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Damage Dealt</p>
                    <p className="text-lg font-bold">{round.damage.amount}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleRematch}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 rounded-lg
                     hover:bg-blue-600 transition-colors duration-300"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Rematch</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-6 py-3 bg-green-500 rounded-lg
                     hover:bg-green-600 transition-colors duration-300"
          >
            <Share2 className="w-5 h-5" />
            <span>Share Results</span>
          </button>
          <button
            onClick={() => navigate('/fights')}
            className="flex items-center space-x-2 px-6 py-3 bg-purple-500 rounded-lg
                     hover:bg-purple-600 transition-colors duration-300"
          >
            <Swords className="w-5 h-5" />
            <span>New Fight</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FightResults;