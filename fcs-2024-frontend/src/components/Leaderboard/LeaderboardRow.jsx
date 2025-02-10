import PropTypes from 'prop-types';

const LeaderboardRow = ({ rank, character }) => {
    return (
        <tr>
            <td>{rank}</td>
            <td>{character.name}</td>
            <td>{character.wins}</td>
            <td>{character.totalFights}</td>
            <td>{(character.winRatio * 100).toFixed(1)}%</td>
        </tr>
    );
};

LeaderboardRow.propTypes = {
    rank: PropTypes.number.isRequired,
    character: PropTypes.shape({
        name: PropTypes.string.isRequired,
        wins: PropTypes.number.isRequired,
        totalFights: PropTypes.number.isRequired,
        winRatio: PropTypes.number.isRequired
    }).isRequired
};

export default LeaderboardRow;
