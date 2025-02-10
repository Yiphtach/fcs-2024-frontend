import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = "http://localhost:3000/api";

export const fetchLeaderboard = async () => {
  try {
      const response = await fetch(`${API_BASE_URL}/leaderboard`);
      return await response.json();
  } catch (error) {
      console.error("Error fetching leaderboard:", error);
      return { leaderboard: [] };
  }
};

export const fetchFightResult = async (character1Id, character2Id, rounds = 3) => {
  try {
      const response = await fetch(`${API_BASE_URL}/fights/simulate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ character1Id, character2Id, rounds })
      });
      return await response.json();
  } catch (error) {
      console.error("Error simulating fight:", error);
      return null;
  }
};


const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'An error occurred');
    }

    return await response.json();
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};

// Character endpoints
export const fetchCharacterById = (id) => 
  fetchAPI(`/characters/${id}`);

export const fetchCharacterPowerstats = (id) => 
  fetchAPI(`/characters/${id}/powerstats`);

export const searchCharacterByName = (name) => 
  fetchAPI(`/characters/search?name=${encodeURIComponent(name)}`);

// Fight endpoints
export const createFight = (fighters) => 
  fetchAPI('/fights', {
    method: 'POST',
    body: JSON.stringify(fighters),
  });

export const getFightResult = (fightId) => 
  fetchAPI(`/fights/${fightId}`);

// Leaderboard endpoints
export const getLeaderboard = () => 
  fetchAPI('/leaderboard');

// Character detailed information
export const fetchCharacterDetails = async (id) => {
  try {
    const [basic, powerstats, biography, appearance] = await Promise.all([
      fetchCharacterById(id),
      fetchCharacterPowerstats(id),
      fetchAPI(`/characters/${id}/biography`),
      fetchAPI(`/characters/${id}/appearance`)
    ]);

    return {
      ...basic,
      powerstats,
      biography,
      appearance,
    };
  } catch (error) {
    throw new Error(`Error fetching character details: ${error.message}`);
  }
};

// Fixed useAPIRequest hook with proper dependency handling
export const useAPIRequest = (apiFunction, ...params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize the fetchData function to prevent unnecessary re-renders
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await apiFunction(...params);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiFunction, params]); // Properly declare dependencies

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Only depend on the memoized function

  return { data, loading, error };
};

// Alternative hook if you need more control over when the request is made
export const useAPIRequestManual = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...params) => {
    try {
      setLoading(true);
      const result = await apiFunction(...params);
      setData(result);
      setError(null);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return { data, loading, error, execute };
};