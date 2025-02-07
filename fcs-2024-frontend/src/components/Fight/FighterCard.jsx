import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Shield, Zap, Swords } from 'lucide-react';

// Import StatBar component
import StatBar from './StatBar';

const FighterCard = ({ fighter, onSelect, isSelected, status }) => {
    const [imageError, setImageError] = useState(false);

    if (!fighter) return null;

    const handleSelect = () => {
        if (onSelect) {
            onSelect(fighter);
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
                bg-gray-800 rounded-xl overflow-hidden shadow-lg 
                ${onSelect ? 'cursor-pointer' : ''}
                transition-all duration-300
                ${isSelected ? 'ring-2 ring-green-500' : ''}
                ${status === 'Winner' ? 'border-4 border-yellow-500' : ''}
                ${status === 'Defeated' ? 'opacity-60' : ''}
            `}
            onClick={handleSelect}
        >
            <div className="relative aspect-w-3 aspect-h-4">
                {!imageError ? (
                    <img
                        src={fighter.imageUrl}
                        alt={fighter.name}
                        className="w-full h-48 object-cover"
                        onError={() => setImageError(true)}
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                        <Shield className="w-12 h-12 text-gray-600" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                {status && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">
                        {status}
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">{fighter.name}</h3>
                
                <div className="text-gray-400 text-sm mb-4">
                    <div className="flex justify-between mb-2">
                        <span>Weight Class: {fighter.weightClass}</span>
                        <span className="text-gray-300">
                            {fighter.wins}-{fighter.losses}
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <StatBar
                        current={fighter.strength}
                        max={100}
                        label="Strength"
                        color="bg-red-500"
                    />
                    <StatBar
                        current={fighter.speed}
                        max={100}
                        label="Speed"
                        color="bg-blue-500"
                    />
                    <StatBar
                        current={fighter.defense}
                        max={100}
                        label="Defense"
                        color="bg-green-500"
                    />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                        <Swords className="w-4 h-4 text-red-400" />
                        <span>{fighter.strength}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4 text-blue-400" />
                        <span>{fighter.speed}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4 text-green-400" />
                        <span>{fighter.defense}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

FighterCard.propTypes = {
    fighter: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        weightClass: PropTypes.string.isRequired,
        wins: PropTypes.number.isRequired,
        losses: PropTypes.number.isRequired,
        strength: PropTypes.number.isRequired,
        speed: PropTypes.number.isRequired,
        defense: PropTypes.number.isRequired
    }),
    onSelect: PropTypes.func,
    isSelected: PropTypes.bool,
    status: PropTypes.oneOf(['Winner', 'Defeated'])
};

FighterCard.defaultProps = {
    isSelected: false,
    status: null
};

export default FighterCard;