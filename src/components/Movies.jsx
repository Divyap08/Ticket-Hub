import React, { useState } from 'react';
import { movies } from '../data/data';
import TicketBookingModal from './TicketBookingModal';

const Movies = ({ onBookTicket, user }) => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [type, setType] = useState('movie');

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuyTicket = (movie) => {
    setSelectedItem(movie);
    setType('movie');
    setShowModal(true);
  };

  return (
    <div className="main-content">
      {/* Search + Location */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="🔍 Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1, padding: '1rem', border: '2px solid #e1e5e9',
            borderRadius: '12px', fontSize: '1rem', minWidth: '300px'
          }}
        />
        <select style={{ padding: '1rem', borderRadius: '12px' }}>
          <option>📍 Mumbai</option><option>Delhi</option><option>Bangalore</option>
        </select>
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: 'white', fontSize: '2.5rem' }}>🎬 Movies</h2>
      <div className="events-grid">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="event-card enhanced">
            <div className="event-image" style={{ backgroundImage: `url(${movie.image})` }} />
            <div className="event-details">
              <h3>{movie.title}</h3>
              <p style={{ color: '#666' }}>{movie.genre} | {movie.language}</p>
              <p style={{ color: '#333', fontSize: '1.2rem' }}>₹{movie.price}</p>
              <button 
                className="btn btn-primary buy-btn"
                onClick={() => handleBuyTicket(movie)}
              >
                Buy Ticket
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL INSIDE Movies COMPONENT */}
      {showModal && (
        <TicketBookingModal
          item={selectedItem}
          type={type}
          onClose={() => setShowModal(false)}
          onBookTicket={onBookTicket}
          user={user}
        />
      )}
    </div>
  );
};

export default Movies;