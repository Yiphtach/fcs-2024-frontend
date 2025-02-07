// apiFetcher.js
import { useState, useEffect } from 'react';

const BASE_URL = '/api'; // This will point to your backend API

// Helper function for making API requests
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
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

// Example usage of error handling and loading states
export const useAPIRequest = (apiFunction, ...params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, [apiFunction, ...params]);

  return { data, loading, error };
};