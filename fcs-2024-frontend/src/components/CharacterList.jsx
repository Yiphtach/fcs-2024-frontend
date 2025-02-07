// CharacterList.jsx
import PropTypes from 'prop-types';

function CharacterList({
  characters = [],
  currentPage = 1,
  totalPages = 1,
  onEdit = () => {},
  onDelete = () => {},
  onPageChange = () => {},
  onCreateNew = () => {}
}) {
  const handleDelete = (characterId) => {
    const confirmed = window.confirm('Are you sure you want to delete this character?');
    if (confirmed) {
      onDelete(characterId);
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-4 py-2 rounded ${
            i === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
          }`}
          aria-label={`Go to page ${i}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Character List</h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Universe</th>
              <th className="px-6 py-3 text-left">Strength</th>
              <th className="px-6 py-3 text-left">Speed</th>
              <th className="px-6 py-3 text-left">Durability</th>
              <th className="px-6 py-3 text-left">Power</th>
              <th className="px-6 py-3 text-left">Combat</th>
              <th className="px-6 py-3 text-left">Intelligence</th>
              <th className="px-6 py-3 text-left">Wins</th>
              <th className="px-6 py-3 text-left">Losses</th>
              <th className="px-6 py-3 text-left">Total Fights</th>
              <th className="px-6 py-3 text-left">Win Ratio</th>
              <th className="px-6 py-3 text-left">Loss Ratio</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {characters.map((character) => (
              <tr key={character._id} className="hover:bg-gray-700">
                <td className="px-6 py-4">{character.name}</td>
                <td className="px-6 py-4">{character.universe}</td>
                <td className="px-6 py-4">{character.stats?.strength}</td>
                <td className="px-6 py-4">{character.stats?.speed}</td>
                <td className="px-6 py-4">{character.stats?.durability}</td>
                <td className="px-6 py-4">{character.stats?.power}</td>
                <td className="px-6 py-4">{character.stats?.combat}</td>
                <td className="px-6 py-4">{character.stats?.intelligence}</td>
                <td className="px-6 py-4">{character.wins}</td>
                <td className="px-6 py-4">{character.losses}</td>
                <td className="px-6 py-4">{character.totalFights}</td>
                <td className="px-6 py-4">{character.winRatio}%</td>
                <td className="px-6 py-4">{character.lossRatio}%</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(character._id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      aria-label={`Edit ${character.name}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(character._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      aria-label={`Delete ${character.name}`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center space-x-2 mt-6">
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Previous
        </button>

        {renderPagination()}

        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={onCreateNew}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          aria-label="Create new character"
        >
          Create New Character
        </button>
      </div>
    </div>
  );
}

CharacterList.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      universe: PropTypes.string.isRequired,
      stats: PropTypes.shape({
        strength: PropTypes.number,
        speed: PropTypes.number,
        durability: PropTypes.number,
        power: PropTypes.number,
        combat: PropTypes.number,
        intelligence: PropTypes.number,
      }),
      wins: PropTypes.number,
      losses: PropTypes.number,
      totalFights: PropTypes.number,
      winRatio: PropTypes.number,
      lossRatio: PropTypes.number,
    })
  ),
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onPageChange: PropTypes.func,
  onCreateNew: PropTypes.func,
};

export default CharacterList;