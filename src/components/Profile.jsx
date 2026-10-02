import React from 'react';
import QRCode from 'qrcode.react';

const Profile = ({ user, tickets, onLogout, onCancelTicket }) => {
  const handleCancelTicket = (ticketId) => {
    if (window.confirm('Are you sure you want to cancel this ticket? This cannot be undone.')) {
      onCancelTicket(ticketId);
    }
  };

  return (
    <div className="main-content">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-avatar">
          {user && user.name && user.name[0] ? user.name[0].toUpperCase() : 'U'}
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#333' }}>
          Welcome, {user && user.name ? user.name : 'User'}!
        </h2>
        <div style={{ textAlign: 'center', marginBottom: '3rem', color: '#666' }}>
          <p><strong>Email:</strong> {user && user.email ? user.email : 'No email'}</p>
          <p><strong>Total Tickets:</strong> 
            <span style={{ color: '#667eea', fontSize: '1.5rem' }}>{tickets.length}</span>
          </p>
        </div>

        {/* Tickets List */}
        <h3 style={{ textAlign: 'center', margin: '2rem 0 1.5rem 0', color: '#333' }}>
          🎫 Your Tickets (Show QR for Entry)
        </h3>
        
        {tickets.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            background: '#f8f9fa', 
            borderRadius: '20px',
            color: '#666'
          }}>
            <h3>No tickets booked yet</h3>
            <p>Book your first ticket from Home or Movies!</p>
          </div>
        ) : (
          <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            {tickets.map((ticket, index) => (
              <div key={index} className="ticket-card" style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '2rem',
                marginBottom: '2rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                {/* Ticket Header with Cancel Button */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '2px solid #eee'
                }}>
                  <div>
                    <h4 style={{ margin: 0, color: '#333' }}>{ticket.item.title}</h4>
                    <small style={{ color: '#666' }}>
                      {ticket.date} | ID: {ticket.qrCode}
                    </small>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ 
                      background: '#28a745', 
                      color: 'white', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '20px', 
                      fontSize: '0.85rem',
                      fontWeight: 'bold'
                    }}>
                      VALID
                    </span>
                    <button 
                      onClick={() => handleCancelTicket(ticket.id)}
                      style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(220,53,69,0.3)'
                      }}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>

                {/* Ticket Details */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <p><strong>Quantity:</strong> {ticket.quantity}</p>
                    {ticket.type === 'movie' && ticket.seats && ticket.seats.length > 0 && (
                      <p><strong>Seats:</strong> {ticket.seats.join(', ')}</p>
                    )}
                    {ticket.location && (
                      <p><strong>Location:</strong> {ticket.location}</p>
                    )}
                  </div>
                  <div>
                    {ticket.food && ticket.food.length > 0 ? (
                      <p><strong>Food:</strong> {ticket.food.map(f => f.name).join(', ')}</p>
                    ) : (
                      <p><strong>Food:</strong> None</p>
                    )}
                    <p style={{ color: '#28a745', fontWeight: 'bold', fontSize: '1.1rem' }}>
                      💰 ₹{ticket.totalPrice ? ticket.totalPrice.toLocaleString() : '0'}
                    </p>
                  </div>
                </div>

                {/* QR CODE FOR ENTRY */}
                <div style={{ 
                  background: 'linear-gradient(135deg, #667eea, #764ba2)', 
                  padding: '1.5rem', 
                  borderRadius: '16px', 
                  textAlign: 'center',
                  marginTop: '1rem'
                }}>
                  <div style={{ 
                    marginBottom: '1rem', 
                    fontSize: '1.2rem', 
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    📱 SCAN QR FOR ENTRY
                  </div>
                  <div style={{ 
                    background: 'white', 
                    padding: '1rem', 
                    borderRadius: '12px', 
                    display: 'inline-block'
                  }}>
                    <QRCode 
                      value={JSON.stringify({
                        ticketId: ticket.qrCode,
                        event: ticket.item.title,
                        user: user ? user.email : 'user',
                        seats: ticket.seats || [],
                        timestamp: ticket.date
                      })} 
                      size={140}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    />
                  </div>
                  <div style={{ 
                    color: 'white', 
                    fontSize: '0.9rem', 
                    marginTop: '0.75rem',
                    opacity: 0.9
                  }}>
                    Show this QR at entrance
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Logout Button */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button 
            className="btn btn-primary" 
            onClick={onLogout} 
            style={{ 
              maxWidth: '250px', 
              padding: '1.2rem 2rem', 
              fontSize: '1.1rem',
              background: 'linear-gradient(45deg, #ff6b6b, #6c757d)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;