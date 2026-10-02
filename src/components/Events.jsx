import React, { useState } from 'react';
import { events } from '../data/data';
import TicketBookingModal from './TicketBookingModal';

const Events = ({ onBookTicket, user }) => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [type, setType] = useState('event');

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuyTicket = (event) => {
    setSelectedItem(event);
    setType('event');
    setShowModal(true);
  };

  return (
    <div className="main-content">
      {/* Search + Location */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="🔍 Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1, padding: '1rem', border: '2px solid #e1e5e9',
            borderRadius: '12px', fontSize: '1rem', minWidth: '300px'
          }}
        />
        <select style={{ padding: '1rem', borderRadius: '12px' }}>
          <option>📍 All Cities</option><option>Mumbai</option><option>Delhi</option>
        </select>
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: '3rem', color: 'white', fontSize: '2.5rem' }}>🎤 Live Events</h2>
      <div className="events-grid">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card enhanced">
            <div className="event-image" style={{ backgroundImage: `url(${event.image})` }} />
            <div className="event-details">
              <h3>{event.title}</h3>
              <p style={{ color: '#666' }}>{event.date} | {event.venue}</p>
              <p style={{ color: '#333' }}>{event.language}</p>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                {event.description}
              </p>
              <p style={{ color: '#333', fontSize: '1.2rem' }}>₹{event.price}</p>
              <button 
                className="btn btn-primary buy-btn"
                onClick={() => handleBuyTicket(event)}
              >
                Buy Ticket
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL INSIDE Events COMPONENT */}
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

export default Events;