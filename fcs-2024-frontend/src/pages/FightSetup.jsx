import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/** @typedef {Object} Universe
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} characterCount
 * @property {string} backgroundImage
 */

const FightSetup = () => {
  const [selectedUniverse, setSelectedUniverse] = useState(null);
  const navigate = useNavigate();

  const universes = [
    {
      id: 'dc',
      name: 'DC',
      description: 'Home to Superman, Batman, and Wonder Woman',
      characterCount: 150,
      backgroundImage: '/images/dc-background.jpg'
    },
    {
      id: 'marvel',
      name: 'Marvel',
      description: 'featuring Spider-Man, Iron Man, and the X-Men',
      characterCount: 200,
      backgroundImage: '/images/marvel-background.jpg'
    },
    {
      id: 'dark-horse',
      name: 'Dark Horse Comics',
      description: 'Home of Hellboy and The Mask',
      characterCount: 50,
      backgroundImage: '/images/dark-horse-background.jpg'
    },
    {
      id: 'image',
      name: 'Image Comics',
      description: 'Featuring Spawn and Invincible',
      characterCount: 75,
      backgroundImage: '/images/image-background.jpg'
    },
    {
      id: 'valiant',
      name: 'Valiant Comics',
      description: 'Home to X-O Manowar and Bloodshot',
      characterCount: 40,
      backgroundImage: '/images/valiant-background.jpg'
    },
    {
      id: 'nbc-heroes',
      name: 'NBC - Heroes',
      description: 'Characters from the Heroes TV series',
      characterCount: 25,
      backgroundImage: '/images/nbc-heroes-background.jpg'
    },
    {
      id: 'other',
      name: 'Other',
      description: 'Characters from various other universes',
      characterCount: 30,
      backgroundImage: '/images/other-background.jpg'
    }
  ];

  const handleUniverseSelect = (universeId) => {
    setSelectedUniverse(universeId);
    setTimeout(() => {
      navigate(`/fights/select-character?universe=${encodeURIComponent(universeId)}`);
    }, 300);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Choose Your Universe
          </h1>
          <p className="text-xl text-gray-300">
            Select a universe to begin your epic battle across dimensions!
          </p>
        </motion.div>

        {/* Universe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {universes.map((universe) => (
            <motion.div
              key={universe.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative overflow-hidden rounded-xl cursor-pointer
                transition-all duration-300
                ${selectedUniverse === universe.id ? 'ring-4 ring-green-400' : ''}
              `}
              onClick={() => handleUniverseSelect(universe.id)}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${universe.backgroundImage})` }}
              />
              <div className="relative p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {universe.name}
                </h2>
                <p className="text-gray-300 mb-4">
                  {universe.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {universe.characterCount} Characters Available
                  </span>
                  <button 
                    className="px-4 py-2 bg-green-500 text-white rounded-lg
                             hover:bg-green-600 transition-colors duration-300"
                  >
                    Select
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center space-x-6">
          <Link 
            to="/fights/gallery"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg
                     hover:bg-blue-600 transition-colors duration-300
                     flex items-center space-x-2"
          >
            <span>View All Characters</span>
          </Link>
          <Link 
            to="/fights/random"
            className="px-6 py-3 bg-purple-500 text-white rounded-lg
                     hover:bg-purple-600 transition-colors duration-300
                     flex items-center space-x-2"
          >
            <span>Random Match</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FightSetup;