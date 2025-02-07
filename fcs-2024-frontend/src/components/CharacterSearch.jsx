// src/components/CharacterSearch.jsx
import { useState } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { useAPIRequestManual } from '../utils/apiFetcher';
import { searchCharacterByName } from '../utils/apiFetcher';
import { CharacterSearchResult } from './CharacterSearchResult';

export const CharacterSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { addToSearchHistory } = useCharacterContext();
  const { data, loading, error, execute } = useAPIRequestManual(searchCharacterByName);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      addToSearchHistory(searchTerm);
      await execute(searchTerm);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search characters..."
            className="flex-1 p-2 border rounded"
          />
          <button 
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      {data && data.results && (
        <div className="grid gap-4">
          {data.results.map(character => (
            <CharacterSearchResult key={character.id} character={character} />
          ))}
        </div>
      )}
    </div>
  );
};