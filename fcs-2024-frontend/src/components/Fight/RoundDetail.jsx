import PropTypes from 'prop-types';
import './../../Styles/RoundDetail.css';

const RoundDetail = ({ round, fighters, scores, delay = 0 }) => {
    return (
        <div 
            className="round-detail"
            style={{ 
                animationDelay: `${delay}s`,
                opacity: 0,
                animation: 'fadeIn 0.5s forwards'
            }}
        >
            <h3>Round {round}</h3>
            <div className="fighters-container">
                <div className="fighter-corner blue">
                    <h4>{fighters.blue}</h4>
                    <p>Score: {scores.blue}</p>
                </div>
                <div className="fighter-corner red">
                    <h4>{fighters.red}</h4>
                    <p>Score: {scores.red}</p>
                </div>
            </div>
        </div>
    );
};

RoundDetail.propTypes = {
    round: PropTypes.number.isRequired,
    fighters: PropTypes.shape({
        blue: PropTypes.string.isRequired,
        red: PropTypes.string.isRequired
    }).isRequired,
    scores: PropTypes.shape({
        blue: PropTypes.number.isRequired,
        red: PropTypes.number.isRequired
    }).isRequired,
    delay: PropTypes.number
};

RoundDetail.defaultProps = {
    delay: 0
};

export default RoundDetail;