// Leaderboard

import Header from '../components/Header';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';

const Leaderboard = ({ characters, currentPage, totalPages }) => {
  return (
    <>
      <Header />

      <main>
        <h1>Leaderboard</h1>

        {/* Leaderboard Table */}
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Total Fights</th>
              <th>Win Ratio</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {characters.map((character, index) => {
              const rank = (currentPage - 1) * 30 + index + 1;
              const winRatio =
                character.totalFights > 0
                  ? ((character.wins / character.totalFights) * 100).toFixed(2)
                  : '0.00';
              return (
                <tr key={character._id}>
                  <td>{rank}</td>
                  <td>{character.name}</td>
                  <td>{character.wins}</td>
                  <td>{character.losses}</td>
                  <td>{character.totalFights}</td>
                  <td>{winRatio} %</td>
                  <td>
                    <a href={`/characters/${character._id}`} className="view-character">
                      View Details
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          {currentPage > 1 && (
            <a href={`?page=${currentPage - 1}`}>Previous</a>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <a
              key={page}
              href={`?page=${page}`}
              className={page === currentPage ? 'active' : ''}
            >
              {page}
            </a>
          ))}

          {currentPage < totalPages && (
            <a href={`?page=${currentPage + 1}`}>Next</a>
          )}
        </div>
      </main>

      <Footer />

      {/* Inline CSS Styling (scoped globally) */}
      <style>{`
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
        }

        h1 {
          font-size: 36px;
          margin-bottom: 20px;
          text-align: center;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        table,
        th,
        td {
          border: 1px solid #ddd;
        }

        th,
        td {
          padding: 12px;
          text-align: center;
        }

        th {
          background-color: #f2f2f2;
        }

        tbody tr:nth-child(odd) {
          background-color: #f9f9f9;
        }

        tbody tr:nth-child(even) {
          background-color: #fff;
        }

        .view-character {
          color: #4caf50;
          text-decoration: none;
        }

        .view-character:hover {
          text-decoration: underline;
        }

        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .pagination a {
          margin: 0 5px;
          padding: 10px 15px;
          background-color: #4caf50;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .pagination a:hover {
          background-color: #45a049;
        }

        .pagination a.active {
          background-color: #333;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          table,
          thead,
          tbody,
          th,
          td,
          tr {
            display: block;
          }
          th {
            text-align: left;
          }
          tbody tr {
            margin-bottom: 15px;
          }
          .pagination {
            flex-direction: column;
            align-items: center;
          }
          .pagination a {
            margin: 5px 0;
          }
        }
      `}</style>
    </>
  );
};
Leaderboard.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      wins: PropTypes.number.isRequired,
      losses: PropTypes.number.isRequired,
      totalFights: PropTypes.number.isRequired,
    })
  ).isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};


export default Leaderboard;
