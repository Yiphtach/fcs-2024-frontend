import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ArrowLeft, Shield, Zap, Brain, Swords } from 'lucide-react';

// Stat icons mapping
const statIcons = {
  strength: Swords,
  speed: Zap,
  intelligence: Brain,
  durability: Shield
};

const StatBar = ({ label, value, Icon, color }) => (
  <div className="flex items-center gap-4">
    <span className="font-medium capitalize flex items-center gap-2">
      <Icon className={`w-5 h-5 ${color}`} />
      {label}:
    </span>
    <div className="flex-1 flex items-center">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
        <div
          className={`${color} h-2.5 rounded-full transition-all duration-300`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="min-w-[2.5rem] text-right">{value}</span>
    </div>
  </div>
);

StatBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  Icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired
};

const CharacterDetails = ({ character }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (character) {
      setIsLoading(false);
    }
  }, [character]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  if (!character) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl text-gray-600">Character not found</p>
        <button
          onClick={() => navigate('/characters')}
          className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Characters
        </button>
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
    <div className="container mx-auto p-4 max-w-3xl">
      <Card className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500" />
        </div>

        <CardHeader>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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
          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Image and Basic Info */}
            <div className="space-y-6">
              <div className="relative group">
                <img 
                  src={imageUrl} 
                  alt={name}
                  className="w-full rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
                <p className="text-gray-700">
                  <span className="font-medium">Universe:</span> {universe}
                </p>
              </div>
            </div>

            {/* Right Column - Stats and Fight Record */}
            <div className="space-y-6">
              {/* Character Stats */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Stats</h2>
                <div className="space-y-4">
                  <StatBar 
                    label="Strength"
                    value={stats.strength}
                    Icon={statIcons.strength}
                    color="bg-red-500"
                  />
                  <StatBar 
                    label="Speed"
                    value={stats.speed}
                    Icon={statIcons.speed}
                    color="bg-blue-500"
                  />
                  <StatBar 
                    label="Intelligence"
                    value={stats.intelligence}
                    Icon={statIcons.intelligence}
                    color="bg-purple-500"
                  />
                  <StatBar 
                    label="Durability"
                    value={stats.durability}
                    Icon={statIcons.durability}
                    color="bg-yellow-500"
                  />
                </div>
              </div>

              {/* Fight Record */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Fight Record</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                      <p className="text-gray-600">Win Rate</p>
                      <p className="text-3xl font-bold text-blue-600">{winRate}%</p>
                      <p className="text-sm text-gray-500">
                        Based on {totalFights} total fights
                      </p>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg shadow-sm text-center">
                    <p className="text-green-600">Wins</p>
                    <p className="text-3xl font-bold text-green-700">{wins}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg shadow-sm text-center">
                    <p className="text-red-600">Losses</p>
                    <p className="text-3xl font-bold text-red-700">{losses}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/fights')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start a Fight
            </button>
            <button
              onClick={() => navigate('/leaderboards')}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              View Leaderboard
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
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