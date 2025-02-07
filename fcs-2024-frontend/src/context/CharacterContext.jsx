// src/context/CharacterContext.jsx
import { useReducer } from 'react';
import PropTypes from 'prop-types';
import { CharacterContext, ActionTypes } from '/src/utils/characterContextUtils';

// Initial state
const initialState = {
  selectedCharacters: [],
  recentlyViewed: [],
  favorites: [],
  searchHistory: []
};


// Reducer function
const characterReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_CHARACTER:
      // Prevent duplicate selections
      if (state.selectedCharacters.some(char => char.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        selectedCharacters: [...state.selectedCharacters, action.payload]
      };
    
    case ActionTypes.DESELECT_CHARACTER:
      return {
        ...state,
        selectedCharacters: state.selectedCharacters.filter(
          char => char.id !== action.payload.id
        )
      };
    
    case ActionTypes.ADD_TO_RECENTLY_VIEWED: {
      const updatedRecent = [action.payload, ...state.recentlyViewed]
        .filter((char, index, self) => 
          index === self.findIndex(c => c.id === char.id)
        )
        .slice(0, 5); // Keep only the 5 most recent
      
      return {
        ...state,
        recentlyViewed: updatedRecent
      };
    }
    
    case ActionTypes.TOGGLE_FAVORITE: {
      const isFavorite = state.favorites.some(char => char.id === action.payload.id);
      const updatedFavorites = isFavorite
        ? state.favorites.filter(char => char.id !== action.payload.id)
        : [...state.favorites, action.payload];
      
      return {
        ...state,
        favorites: updatedFavorites
      };
    }
    
    case ActionTypes.CLEAR_SELECTED:
      return {
        ...state,
        selectedCharacters: []
      };

    case ActionTypes.ADD_TO_SEARCH_HISTORY: {
      const updatedHistory = [action.payload, ...state.searchHistory]
        .filter((term, index, self) => self.indexOf(term) === index)
        .slice(0, 10); // Keep only the 10 most recent searches
      
      return {
        ...state,
        searchHistory: updatedHistory
      };
    }

    default:
      return state;
  }
};

// Provider component
export const CharacterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(characterReducer, initialState);

  const value = {
    // State
    selectedCharacters: state.selectedCharacters,
    recentlyViewed: state.recentlyViewed,
    favorites: state.favorites,
    searchHistory: state.searchHistory,

    // Actions
    selectCharacter: (character) => 
      dispatch({ type: ActionTypes.SELECT_CHARACTER, payload: character }),
    
    deselectCharacter: (character) => 
      dispatch({ type: ActionTypes.DESELECT_CHARACTER, payload: character }),
    
    addToRecentlyViewed: (character) => 
      dispatch({ type: ActionTypes.ADD_TO_RECENTLY_VIEWED, payload: character }),
    
    toggleFavorite: (character) => 
      dispatch({ type: ActionTypes.TOGGLE_FAVORITE, payload: character }),
    
    clearSelected: () => 
      dispatch({ type: ActionTypes.CLEAR_SELECTED }),
    
    addToSearchHistory: (searchTerm) => 
      dispatch({ type: ActionTypes.ADD_TO_SEARCH_HISTORY, payload: searchTerm })
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};

// PropTypes for the provider
CharacterProvider.propTypes = {
  children: PropTypes.node.isRequired
};


