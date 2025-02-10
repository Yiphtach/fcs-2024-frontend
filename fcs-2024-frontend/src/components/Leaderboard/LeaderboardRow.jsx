import PropTypes from 'prop-types';

const LeaderboardRow = ({ rank, character }) => {
    return (
        <tr className="border border-gray-600 text-center">
            <td className="py-2 px-4">{rank}</td>
            <td className="py-2 px-4">{character.name}</td>
            <td className="py-2 px-4">{character.wins}</td>
            <td className="py-2 px-4">{character.totalFights}</td>
            <td className="py-2 px-4">{(character.winRatio * 100).toFixed(1)}%</td>
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
