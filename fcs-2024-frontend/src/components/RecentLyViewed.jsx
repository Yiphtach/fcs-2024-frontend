// src/components/RecentlyViewed.jsx
import { useCharacterContext } from '../context/CharacterContext';
import { CharacterSearchResult } from './CharacterSearchResult';

export const RecentlyViewed = () => {
    const { recentlyViewed } = useCharacterContext();
  
    if (recentlyViewed.length === 0) {
      return null;
    }
  
    return (
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recently Viewed</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {recentlyViewed.map(character => (
            <CharacterSearchResult key={character.id} character={character} />
          ))}
        </div>
      </div>
    );
  };