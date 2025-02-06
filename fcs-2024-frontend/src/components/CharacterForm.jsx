import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Trash2, Plus, AlertCircle } from 'lucide-react';

const STAT_LIMITS = {
  min: 0,
  max: 100
};

const INITIAL_ABILITY = { name: '', powerLevel: '' };

const UNIVERSES = [
  { id: 'marvel', name: 'Marvel' },
  { id: 'dc', name: 'DC' },
  { id: 'darkhorse', name: 'Dark Horse' },
  { id: 'image', name: 'Image Comics' },
  { id: 'valiant', name: 'Valiant' },
  { id: 'other', name: 'Other' }
];

const CharacterForm = ({ character, onSubmit, isSubmitting = false }) => {
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
    abilities: character?.abilities || [INITIAL_ABILITY]
  });

  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  // Validate form data whenever it changes
  useEffect(() => {
    if (!isDirty) return;

    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Universe validation
    if (!formData.universe) {
      newErrors.universe = 'Please select a universe';
    }

    // Stats validation
    Object.entries(formData.stats).forEach(([stat, value]) => {
      if (value === '') {
        newErrors[`stats.${stat}`] = `${stat} is required`;
      } else {
        const numValue = Number(value);
        if (numValue < STAT_LIMITS.min || numValue > STAT_LIMITS.max) {
          newErrors[`stats.${stat}`] = `${stat} must be between ${STAT_LIMITS.min} and ${STAT_LIMITS.max}`;
        }
      }
    });

    // Abilities validation
    formData.abilities.forEach((ability, index) => {
      if (ability.name && !ability.powerLevel) {
        newErrors[`ability.${index}.powerLevel`] = 'Power level is required';
      }
      if (ability.powerLevel && !ability.name) {
        newErrors[`ability.${index}.name`] = 'Ability name is required';
      }
    });

    setErrors(newErrors);
  }, [formData, isDirty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsDirty(true);

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
    setIsDirty(true);
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
      abilities: [...prev.abilities, INITIAL_ABILITY]
    }));
  };

  const removeAbility = (index) => {
    setFormData(prev => ({
      ...prev,
      abilities: prev.abilities.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDirty(true);

    // Validate form before submission
    if (Object.keys(errors).length > 0) {
      // Scroll to first error
      const firstErrorField = document.querySelector('[data-error="true"]');
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Convert string values to numbers for stats and power levels
    const processedData = {
      ...formData,
      stats: Object.entries(formData.stats).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: Number(value)
      }), {}),
      abilities: formData.abilities.map(ability => ({
        ...ability,
        powerLevel: Number(ability.powerLevel)
      }))
    };

    onSubmit(processedData);
  };

  const renderField = (name, label, type = 'text', options = {}) => {
    const error = errors[name];
    return (
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="mt-1 relative">
          <input
            type={type}
            id={name}
            name={name}
            value={options.value ?? formData[name]}
            onChange={handleChange}
            className={`
              block w-full rounded-md shadow-sm focus:ring-2 focus:ring-offset-2
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                     : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
            `}
            data-error={!!error}
            {...options}
          />
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
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
              {renderField('name', 'Name', 'text', { required: true })}

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
                  className={`
                    mt-1 block w-full rounded-md shadow-sm
                    ${errors.universe ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
                  `}
                  data-error={!!errors.universe}
                >
                  <option value="">Select Universe</option>
                  {UNIVERSES.map(universe => (
                    <option key={universe.id} value={universe.id}>
                      {universe.name}
                    </option>
                  ))}
                </select>
                {errors.universe && (
                  <p className="mt-1 text-sm text-red-600">{errors.universe}</p>
                )}
              </div>
            </div>

            {/* Stats Section */}
            <fieldset className="border rounded-md p-4">
              <legend className="text-lg font-medium text-gray-700 px-2">
                Stats ({STAT_LIMITS.min}-{STAT_LIMITS.max})
              </legend>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(formData.stats).map(([stat, value]) => (
                  <div key={stat}>
                    {renderField(`stats.${stat}`, stat, 'number', {
                      value,
                      min: STAT_LIMITS.min,
                      max: STAT_LIMITS.max,
                      required: true
                    })}
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
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-grow grid grid-cols-2 gap-4">
                      <div>
                        {renderField(
                          `ability.${index}.name`,
                          `Ability ${index + 1}`,
                          'text',
                          {
                            value: ability.name,
                            onChange: (e) => handleAbilityChange(index, 'name', e.target.value),
                            placeholder: 'Enter ability name'
                          }
                        )}
                      </div>
                      <div>
                        {renderField(
                          `ability.${index}.powerLevel`,
                          'Power Level',
                          'number',
                          {
                            value: ability.powerLevel,
                            onChange: (e) => handleAbilityChange(index, 'powerLevel', e.target.value),
                            min: STAT_LIMITS.min,
                            max: STAT_LIMITS.max,
                            placeholder: 'Power Level'
                          }
                        )}
                      </div>
                    </div>
                    {formData.abilities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAbility(index)}
                        className="mt-6 p-2 text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Remove ability"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAbility}
                  className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-md 
                           hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  disabled={formData.abilities.length >= 5}
                >
                  <Plus className="w-4 h-4" />
                  Add Ability
                </button>
              </div>
            </fieldset>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || Object.keys(errors).length > 0}
              className={`
                w-full px-4 py-2 rounded-md text-white transition-colors
                ${isSubmitting || Object.keys(errors).length > 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'}
              `}
            >
              {isSubmitting ? 'Saving...' : character ? 'Update' : 'Create'} Character
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

CharacterForm.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string,
    universe: PropTypes.string,
    stats: PropTypes.shape({
      strength: PropTypes.number,
      speed: PropTypes.number,
      durability: PropTypes.number,
      power: PropTypes.number,
      combat: PropTypes.number,
      intelligence: PropTypes.number
    }),
    abilities: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      powerLevel: PropTypes.number
    }))
  }),
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool
};

export default CharacterForm;