// src/context/CharacterContext.js
import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const CharacterContext = createContext();

const initialState = {
  selectedCharacters: [],
  recentlyViewed: [],
  favorites: []
};

const characterReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_CHARACTER':
      return {
        ...state,
        selectedCharacters: [...state.selectedCharacters, action.payload]
      };
    
    case 'DESELECT_CHARACTER':
      return {
        ...state,
        selectedCharacters: state.selectedCharacters.filter(
          char => char.id !== action.payload.id
        )
      };
    
    case 'ADD_TO_RECENTLY_VIEWED': {
      const updatedRecent = [action.payload, ...state.recentlyViewed]
        .filter((char, index, self) => 
          index === self.findIndex(c => c.id === char.id)
        )
        .slice(0, 5);
      
      return {
        ...state,
        recentlyViewed: updatedRecent
      };
    }
    
    case 'TOGGLE_FAVORITE': {
      const isFavorite = state.favorites.some(char => char.id === action.payload.id);
      const updatedFavorites = isFavorite
        ? state.favorites.filter(char => char.id !== action.payload.id)
        : [...state.favorites, action.payload];
      
      return {
        ...state,
        favorites: updatedFavorites
      };
    }
    
    case 'CLEAR_SELECTED':
      return {
        ...state,
        selectedCharacters: []
      };

    default:
      return state;
  }
};

export const CharacterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(characterReducer, initialState);

  const value = {
    ...state,
    selectCharacter: (character) => 
      dispatch({ type: 'SELECT_CHARACTER', payload: character }),
    deselectCharacter: (character) => 
      dispatch({ type: 'DESELECT_CHARACTER', payload: character }),
    addToRecentlyViewed: (character) => 
      dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: character }),
    toggleFavorite: (character) => 
      dispatch({ type: 'TOGGLE_FAVORITE', payload: character }),
    clearSelected: () => 
      dispatch({ type: 'CLEAR_SELECTED' })
  };
  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};

CharacterProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacterContext must be used within a CharacterProvider');
  }
  return context;
};