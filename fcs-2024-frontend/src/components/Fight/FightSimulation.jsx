import PropTypes from 'prop-types';

const FightSimulation = ({ result }) => {
    return (
        <div className="max-w-lg mx-auto bg-secondary text-white p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-center mb-4">🥊 Fight Results</h2>
            <p className="text-lg"><strong>Winner:</strong> {result.fightResult.winner}</p>
            <p className="text-lg"><strong>Loser:</strong> {result.fightResult.loser}</p>
            <p className="text-lg"><strong>Rounds:</strong> {result.fightResult.totalRounds}</p>
            <h3 className="text-lg font-bold mt-4">Fight Log:</h3>
            <ul className="list-disc pl-5">
                {result.fightResult.fightLog.map((log, index) => (
                    <li key={index} className="text-sm">{log}</li>
                ))}
            </ul>
        </div>
    );
};

FightSimulation.propTypes = {
    result: PropTypes.shape({
        fightResult: PropTypes.shape({
            winner: PropTypes.string.isRequired,
            loser: PropTypes.string.isRequired,
            totalRounds: PropTypes.number.isRequired,
            fightLog: PropTypes.arrayOf(PropTypes.string).isRequired
        }).isRequired
    }).isRequired
};

export default FightSimulation;
