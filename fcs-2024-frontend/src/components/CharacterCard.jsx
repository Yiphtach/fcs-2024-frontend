import PropTypes from 'prop-types';
import '../styles/characters.css';  // Importing component-specific styling

/**
 * CharacterCard Component
 * 
 * This component receives a 'character' object via props and renders a card
 * displaying character details such as name, universe, stats, abilities, and fight records.
 */
const CharacterCard = ({ character }) => {
  // Destructure the character object to extract necessary properties
  const {
    name,
    universe,
    stats,
    abilities,
    imageUrl,
    wins,
    losses,
    totalFights,
    winRatio,
    lossRatio,
    averageAbilityPower
  } = character;

  return (
    <div className="character-card">
      <div className="character-card__image">
        <img
          src={imageUrl}
          alt={`${name}`}
          // Fallback to default image if imageUrl fails to load
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://example.com/default-image.jpg";
          }}
        />
      </div>
      <div className="character-card__details">
        <h2 className="character-card__name">{name}</h2>
        <p className="character-card__universe">{universe}</p>
        
        <div className="character-card__stats">
          <h3>Stats</h3>
          <ul>
            <li>Strength: {stats.strength}</li>
            <li>Speed: {stats.speed}</li>
            <li>Durability: {stats.durability}</li>
            <li>Power: {stats.power}</li>
            <li>Combat: {stats.combat}</li>
            <li>Intelligence: {stats.intelligence}</li>
          </ul>
        </div>
        
        <div className="character-card__record">
          <h3>Fight Record</h3>
          <ul>
            <li>Wins: {wins}</li>
            <li>Losses: {losses}</li>
            <li>Total Fights: {totalFights}</li>
            <li>Win Ratio: {winRatio}</li>
            <li>Loss Ratio: {lossRatio}</li>
          </ul>
        </div>
        
        {abilities && abilities.length > 0 && (
          <div className="character-card__abilities">
            <h3>Abilities</h3>
            <ul>
              {abilities.map((ability, index) => (
                <li key={index}>
                  {typeof ability === 'object'
                    ? `${ability.name} (Power: ${ability.powerLevel})`
                    : ability}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {averageAbilityPower && (
          <div className="character-card__average-ability">
            <p>Average Ability Power: {averageAbilityPower}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// PropTypes ensure that the component receives the correct data structure.
// This practice reduces bugs and improves maintainability (Martin, 2002; Bass et al., 2012).
CharacterCard.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    universe: PropTypes.string.isRequired,
    stats: PropTypes.shape({
      strength: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
      durability: PropTypes.number.isRequired,
      power: PropTypes.number.isRequired,
      combat: PropTypes.number.isRequired,
      intelligence: PropTypes.number.isRequired,
    }).isRequired,
    abilities: PropTypes.array,
    imageUrl: PropTypes.string,
    wins: PropTypes.number,
    losses: PropTypes.number,
    totalFights: PropTypes.number,
    winRatio: PropTypes.string,
    lossRatio: PropTypes.string,
    averageAbilityPower: PropTypes.string,
  }).isRequired,
};

export default CharacterCard;
