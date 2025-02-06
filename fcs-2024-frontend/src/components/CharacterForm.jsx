import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CharacterForm = ({ character, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: character?.name || '',
    universe: character?.universe || '',
    stats: {
      strength: character?.stats?.strength || '',
      speed: character?.stats?.speed || '',
      durability: character?.stats?.durability || '',
      power: character?.stats?.power || '',
      combat: character?.stats?.combat || '',
      intelligence: character?.stats?.intelligence || ''
    },
    abilities: character?.abilities || [{ name: '', powerLevel: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('stats.')) {
      const statName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          [statName]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAbilityChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      abilities: prev.abilities.map((ability, i) =>
        i === index ? { ...ability, [field]: value } : ability
      )
    }));
  };

  const addAbility = () => {
    setFormData(prev => ({
      ...prev,
      abilities: [...prev.abilities, { name: '', powerLevel: '' }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {character ? 'Edit' : 'Create'} Character
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter character name"
                />
              </div>

              <div>
                <label htmlFor="universe" className="block text-sm font-medium text-gray-700">
                  Universe
                </label>
                <select
                  id="universe"
                  name="universe"
                  value={formData.universe}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Universe</option>
                  <option value="Marvel">Marvel</option>
                  <option value="DC">DC</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Stats Section */}
            <fieldset className="border rounded-md p-4">
              <legend className="text-lg font-medium text-gray-700 px-2">
                Stats (0-100)
              </legend>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(formData.stats).map(([stat, value]) => (
                  <div key={stat}>
                    <label
                      htmlFor={stat}
                      className="block text-sm font-medium text-gray-700 capitalize"
                    >
                      {stat}
                    </label>
                    <input
                      type="number"
                      id={stat}
                      name={`stats.${stat}`}
                      value={value}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Abilities Section */}
            <fieldset className="border rounded-md p-4">
              <legend className="text-lg font-medium text-gray-700 px-2">
                Abilities
              </legend>
              <div className="space-y-4">
                {formData.abilities.map((ability, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`ability-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ability {index + 1}
                      </label>
                      <input
                        type="text"
                        id={`ability-${index}`}
                        value={ability.name}
                        onChange={(e) => handleAbilityChange(index, 'name', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter ability name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`power-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Power Level
                      </label>
                      <input
                        type="number"
                        id={`power-${index}`}
                        value={ability.powerLevel}
                        onChange={(e) => handleAbilityChange(index, 'powerLevel', e.target.value)}
                        min="0"
                        max="100"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Power Level"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAbility}
                  className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Add Ability
                </button>
              </div>
            </fieldset>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              {character ? 'Update' : 'Create'} Character
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CharacterForm;