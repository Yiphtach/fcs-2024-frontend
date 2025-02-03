import React from 'react';

// Optionally, import a dedicated CSS file or create a styles object for inline styling
// import './CharacterList.css';

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
    // Typically you'd confirm deletion via a modal or confirm dialog
    const confirmed = window.confirm('Are you sure you want to delete this character?');
    if (confirmed) {
      onDelete(characterId);
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <a
          key={i}
          href="#!"
          className={i === currentPage ? 'active' : ''}
          onClick={() => onPageChange(i)}
          style={styles.paginationLink}
        >
          {i}
        </a>
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
                {/* EDIT BUTTON */}
                <button
                  onClick={() => onEdit(character._id)}
                  style={styles.actionButton}
                >
                  Edit
                </button>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => handleDelete(character._id)}
                  style={styles.actionButton}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={styles.pagination}>
        {/* PREVIOUS BUTTON */}
        {currentPage > 1 ? (
          <a
            href="#!"
            onClick={() => onPageChange(currentPage - 1)}
            style={{ ...styles.paginationLink, ...styles.navButton }}
          >
            Previous
          </a>
        ) : (
          <a
            href="#!"
            style={{ ...styles.paginationLink, ...styles.disabled }}
            onClick={(e) => e.preventDefault()}
          >
            Previous
          </a>
        )}

        {/* PAGE NUMBERS */}
        {renderPagination()}

        {/* NEXT BUTTON */}
        {currentPage < totalPages ? (
          <a
            href="#!"
            onClick={() => onPageChange(currentPage + 1)}
            style={{ ...styles.paginationLink, ...styles.navButton }}
          >
            Next
          </a>
        ) : (
          <a
            href="#!"
            style={{ ...styles.paginationLink, ...styles.disabled }}
            onClick={(e) => e.preventDefault()}
          >
            Next
          </a>
        )}
      </div>

      {/* Create New Character Button */}
      <button onClick={onCreateNew} style={styles.createButton}>
        Create New Character
      </button>
    </div>
  );
}

// Inline Styles (Optional). Typically, you would use a separate CSS file.
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
  },
  navButton: {
    // Additional styling for prev/next
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

export default CharacterList;
