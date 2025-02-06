import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet-async';

// Mock character data - replace with actual data fetching method
const mockCharacters = [
  { _id: '1', name: 'Superman' },
  { _id: '2', name: 'Batman' },
  { _id: '3', name: 'Wonder Woman' },
  { _id: '4', name: 'Spider-Man' },
  { _id: '5', name: 'Iron Man' }
];

const CharacterBattleSelection = () => {
  const [char1Id, setChar1Id] = useState('');
  const [char2Id, setChar2Id] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (char1Id === char2Id) {
      setError('Please select two different characters.');
      return;
    }

    // Clear any previous errors
    setError('');

    // Navigate to battle simulation page with selected characters
    navigate('/fights/simulate', { 
      state: { 
        char1Id, 
        char2Id 
      } 
    });
  };

  return (
    <>
      <Helmet>
        <title>Select Characters - Fight Simulation App</title>
      </Helmet>
      
      <Header title="Fight Simulation App" />
      
      <main className="p-5 text-center">
        <h1 className="text-3xl md:text-4xl mb-10 text-gray-800 font-bold">
          Select Characters for Battle
        </h1>

        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col items-center mt-5"
        >
          <div className="flex flex-col md:flex-row justify-around w-full md:w-3/5 mb-8">
            <div className="mb-4 md:mb-0">
              <label 
                htmlFor="char1" 
                className="block text-lg mb-2 text-gray-700"
              >
                Choose Character 1:
              </label>
              <select
                id="char1"
                value={char1Id}
                onChange={(e) => setChar1Id(e.target.value)}
                required
                className="px-4 py-2 text-base w-[250px] border rounded-md"
              >
                <option value="">Select Character 1</option>
                {mockCharacters.map((character) => (
                  <option key={character._id} value={character._id}>
                    {character.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label 
                htmlFor="char2" 
                className="block text-lg mb-2 text-gray-700"
              >
                Choose Character 2:
              </label>
              <select
                id="char2"
                value={char2Id}
                onChange={(e) => setChar2Id(e.target.value)}
                required
                className="px-4 py-2 text-base w-[250px] border rounded-md"
              >
                <option value="">Select Character 2</option>
                {mockCharacters.map((character) => (
                  <option key={character._id} value={character._id}>
                    {character.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="text-red-500 mb-4">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="px-8 py-3 bg-red-600 text-white rounded-md 
                       text-lg hover:bg-red-700 transition-colors 
                       duration-300 ease-in-out"
          >
            Start Battle
          </button>
        </form>
      </main>
      
      <Footer />
    </>
  );
};

export default CharacterBattleSelection;