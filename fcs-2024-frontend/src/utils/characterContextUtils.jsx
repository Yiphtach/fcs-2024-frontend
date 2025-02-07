import { createContext } from 'react';

// Define the Character type
/**
 * @typedef {Object} Character
 * @property {string} id
 * @property {string} name
 * @property {number} level
 * @property {number} exp
 */

// Define the state type
/**
 * @typedef {Object} CharacterState
 * @property {Character[]} characters
 * @property {Character|null} currentCharacter
 */

// Define action types
export const ActionTypes = {
    ADD_CHARACTER: 'ADD_CHARACTER',
    REMOVE_CHARACTER: 'REMOVE_CHARACTER',
    UPDATE_CHARACTER: 'UPDATE_CHARACTER',
    SET_CURRENT_CHARACTER: 'SET_CURRENT_CHARACTER',
};

// Define action interfaces
/**
 * @typedef {Object} CharacterAction
 * @property {ActionTypes} type
 * @property {any} payload
 */

// Initial state
export const initialState = {
    characters: [],
    currentCharacter: null,
};

export const CharacterContext = createContext({
    state: initialState,
    dispatch: () => null,
});

// Reducer function
export const characterReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CHARACTER:
            return {
                ...state,
                characters: [...state.characters, action.payload],
            };
        case ActionTypes.REMOVE_CHARACTER:
            return {
                ...state,
                characters: state.characters.filter(char => char.id !== action.payload),
            };
        case ActionTypes.UPDATE_CHARACTER:
            return {
                ...state,
                characters: state.characters.map(char =>
                    char.id === action.payload.id ? { ...char, ...action.payload } : char
                ),
            };
        case ActionTypes.SET_CURRENT_CHARACTER:
            return {
                ...state,
                currentCharacter: action.payload,
            };
        default:
            return state;
    }
};

export default characterReducer;