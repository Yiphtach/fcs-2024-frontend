import PropTypes from 'prop-types';
import './FighterCard.css'; // You'll need to create this CSS file

const FighterCard = ({ fighter, onSelect }) => {
    if (!fighter) return null;

    return (
        <div className="fighter-card" onClick={() => onSelect && onSelect(fighter)}>
            <div className="fighter-image">
                <img src={fighter.imageUrl} alt={fighter.name} />
            </div>
            <div className="fighter-info">
                <h3>{fighter.name}</h3>
                <div className="fighter-stats">
                    <p>Weight Class: {fighter.weightClass}</p>
                    <p>Record: {fighter.wins}-{fighter.losses}</p>
                    <div className="fighter-attributes">
                        <span>STR: {fighter.strength}</span>
                        <span>SPD: {fighter.speed}</span>
                        <span>DEF: {fighter.defense}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

FighterCard.propTypes = {
    fighter: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        weightClass: PropTypes.string.isRequired,
        wins: PropTypes.number.isRequired,
        losses: PropTypes.number.isRequired,
        strength: PropTypes.number.isRequired,
        speed: PropTypes.number.isRequired,
        defense: PropTypes.number.isRequired
    }),
    onSelect: PropTypes.func
};

export default FighterCard;