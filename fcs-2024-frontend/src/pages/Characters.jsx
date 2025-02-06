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
    // Confirm deletion via a modal or confirm dialog
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
          style={{
            ...styles.paginationLink,
            ...(i === currentPage ? styles.activePaginationLink : {})
          }}
          aria-label={`Go to page ${i}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Character List</h1>

      {/* Table of Characters */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Universe</th>
            <th>Strength</th>
            <th>Speed</th>
            <th>Durability</th>
            <th>Power</th>
            <th>Combat</th>
            <th>Intelligence</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Total Fights</th>
            <th>Win Ratio</th>
            <th>Loss Ratio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <tr key={character._id}>
              <td>{character.name}</td>
              <td>{character.universe}</td>
              <td>{character.stats?.strength}</td>
              <td>{character.stats?.speed}</td>
              <td>{character.stats?.durability}</td>
              <td>{character.stats?.power}</td>
              <td>{character.stats?.combat}</td>
              <td>{character.stats?.intelligence}</td>
              <td>{character.wins}</td>
              <td>{character.losses}</td>
              <td>{character.totalFights}</td>
              <td>{character.winRatio}</td>
              <td>{character.lossRatio}</td>
              <td>
                {/* Edit Button */}
                <button
                  onClick={() => onEdit(character._id)}
                  style={styles.actionButton}
                  aria-label={`Edit ${character.name}`}
                >
                  Edit
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(character._id)}
                  style={styles.actionButton}
                  aria-label={`Delete ${character.name}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={styles.pagination} role="navigation" aria-label="Pagination">
        {/* Previous Button */}
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          style={{
            ...styles.paginationLink,
            ...styles.navButton,
            ...(currentPage === 1 ? styles.disabled : {})
          }}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {renderPagination()}

        {/* Next Button */}
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          style={{
            ...styles.paginationLink,
            ...styles.navButton,
            ...(currentPage === totalPages ? styles.disabled : {})
          }}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </div>

      {/* Create New Character Button */}
      <button
        onClick={onCreateNew}
        style={styles.createButton}
        aria-label="Create new character"
      >
        Create New Character
      </button>
    </div>
  );
}

// Inline Styles (For demonstration; typically, a separate CSS file is recommended)
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  title: {
    fontSize: '36px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    border: '1px solid #ddd',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
  },
  paginationLink: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  },
  activePaginationLink: {
    backgroundColor: '#388E3C',
  },
  navButton: {
    // Additional styling for navigation buttons (if needed)
  },
  disabled: {
    pointerEvents: 'none',
    backgroundColor: '#ddd',
    color: '#999',
  },
  actionButton: {
    margin: '0 5px',
    padding: '8px 12px',
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  createButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

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
