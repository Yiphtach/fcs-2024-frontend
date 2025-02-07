import { useState, useEffect } from 'react';
import { fetchCharacterById, fetchCharacterDetails, searchCharacterByName } from '../utils/apiFetcher';

export const useCharacter = (characterId) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        setLoading(true);
        const data = await fetchCharacterById(characterId);
        setCharacter(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (characterId) {
      loadCharacter();
    }
  }, [characterId]);

  return { character, loading, error };
};

// src/hooks/useCharacterSearch.js
export const useCharacterSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchCharacter = async (name) => {
    try {
      setLoading(true);
      const data = await searchCharacterByName(name);
      setSearchResults(data.results || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { searchResults, loading, error, searchCharacter };
};

// src/hooks/useCharacterDetails.js
export const useCharacterDetails = (characterId) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchCharacterDetails(characterId);
        setDetails(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (characterId) {
      loadDetails();
    }
  }, [characterId]);

  return { details, loading, error };
};