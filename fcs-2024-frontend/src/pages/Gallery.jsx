import React from 'react';
import { Link } from 'react-router-dom';
import './GalleryPage.css';

const GalleryPage = ({ characters }) => {
  return (
    <div className="gallery-container">
      <h1>Character Gallery</h1>

      <div className="character-gallery">
        {characters.map((character) => (
          <div key={character._id} className="character-card">
            <img 
              src={character.imageUrl} 
              alt={character.name} 
              className="character-image"
            />
            <div className="character-name">{character.name}</div>
            <Link 
              to={`/fights/selectCharacter?charId=${character._id}`} 
              className="select-button"
            >
              Select
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;