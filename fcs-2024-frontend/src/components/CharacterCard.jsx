import PropTypes from 'prop-types';
import { Swords, Zap, Shield, Brain, Activity, Trophy } from 'lucide-react';

const StatDisplay = ({ label, value, Icon }) => (
  <div className="flex items-center gap-2">
    <Icon className="w-4 h-4 text-gray-600" />
    <span className="font-medium">{label}:</span>
    <div className="flex-1 bg-gray-200 rounded-full h-2">
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
    <span className="text-sm font-medium">{value}</span>
  </div>
);

const CharacterCard = ({ character }) => {
  const {
    name,
    universe,
    stats,
    abilities,
    imageUrl,
    wins,
    losses,
    totalFights,
    winRatio,
    lossRatio,
    averageAbilityPower
  } = character;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={`${name}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-character.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-4 left-4">
            <h2 className="text-white text-xl font-bold">{name}</h2>
            <p className="text-gray-200">{universe}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-4">
        {/* Stats Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Stats
          </h3>
          <div className="space-y-2">
            <StatDisplay label="Strength" value={stats.strength} Icon={Swords} />
            <StatDisplay label="Speed" value={stats.speed} Icon={Zap} />
            <StatDisplay label="Durability" value={stats.durability} Icon={Shield} />
            <StatDisplay label="Intelligence" value={stats.intelligence} Icon={Brain} />
          </div>
        </div>

        {/* Fight Record */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5" />
            Fight Record
          </h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-green-50 p-2 rounded">
              <p className="text-sm text-green-600">Wins</p>
              <p className="font-bold text-green-700">{wins}</p>
            </div>
            <div className="bg-red-50 p-2 rounded">
              <p className="text-sm text-red-600">Losses</p>
              <p className="font-bold text-red-700">{losses}</p>
            </div>
            <div className="bg-blue-50 p-2 rounded">
              <p className="text-sm text-blue-600">Total</p>
              <p className="font-bold text-blue-700">{totalFights}</p>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600 text-center">
            Win Rate: {winRatio} | Loss Rate: {lossRatio}
          </div>
        </div>

        {/* Abilities Section */}
        {abilities && abilities.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Abilities</h3>
            <div className="grid grid-cols-2 gap-2">
              {abilities.map((ability, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 p-2 rounded text-sm"
                >
                  {typeof ability === 'object' ? (
                    <>
                      <span className="font-medium">{ability.name}</span>
                      <span className="text-gray-600"> (Power: {ability.powerLevel})</span>
                    </>
                  ) : (
                    ability
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Average Ability Power */}
        {averageAbilityPower && (
          <div className="text-sm text-gray-600 text-center border-t pt-2">
            Average Ability Power: {averageAbilityPower}
          </div>
        )}
      </div>
    </div>
  );
};

StatDisplay.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  Icon: PropTypes.elementType.isRequired,
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    universe: PropTypes.string.isRequired,
    stats: PropTypes.shape({
      strength: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
      durability: PropTypes.number.isRequired,
      power: PropTypes.number.isRequired,
      combat: PropTypes.number.isRequired,
      intelligence: PropTypes.number.isRequired,
    }).isRequired,
    abilities: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          powerLevel: PropTypes.number.isRequired,
        }),
      ])
    ),
    imageUrl: PropTypes.string.isRequired,
    wins: PropTypes.number.isRequired,
    losses: PropTypes.number.isRequired,
    totalFights: PropTypes.number.isRequired,
    winRatio: PropTypes.string.isRequired,
    lossRatio: PropTypes.string.isRequired,
    averageAbilityPower: PropTypes.string,
  }).isRequired,
};

export default CharacterCard;