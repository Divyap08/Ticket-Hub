import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { theatres, foods } from '../data/data';

const TicketBookingModal = ({ item, type, onClose, onBookTicket, user }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const locations = type === 'movie' ? theatres : ['DY Patil Stadium', 'JLN Stadium', 'Wankhede Stadium', 'Eden Gardens'];

  // Real-time price calculation
  useEffect(() => {
    const ticketPrice = item?.price * quantity || 0;
    const foodPrice = selectedFood.reduce((sum, food) => sum + food.price, 0) * quantity;
    setTotalPrice(ticketPrice + foodPrice);
  }, [quantity, selectedFood, item]);

  const toggleSeat = (seat) => {
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else if (selectedSeats.length < quantity) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const addFood = (food) => {
    const exists = selectedFood.find(f => f.id === food.id);
    if (exists) {
      setSelectedFood(selectedFood.filter(f => f.id !== food.id));
    } else {
      setSelectedFood([...selectedFood, food]);
    }
  };

  const clearErrors = () => setErrors({});

  const validateAndBook = () => {
    clearErrors();
    
    let isValid = true;
    
    // Location validation
    if (!selectedLocation) {
      setErrors(prev => ({ ...prev, location: '✅ Select theatre/location first' }));
      isValid = false;
    }
    
    // Seats validation (movies only)
    if (type === 'movie' && selectedSeats.length !== quantity) {
      setErrors(prev => ({ ...prev, seats: `✅ Select exactly ${quantity} seat(s)` }));
      isValid = false;
    }
    
    // Quantity validation
    if (quantity < 1 || quantity > 25) {
      setErrors(prev => ({ ...prev, quantity: '✅ Quantity 1-25 only' }));
      isValid = false;
    }

    if (isValid) {
      const ticketData = {
        id: Date.now(),
        item: item,
        type,
        quantity,
        location: selectedLocation,
        seats: type === 'movie' ? selectedSeats : [],
        food: selectedFood,
        date: new Date().toLocaleString(),
        qrCode: `TICKET_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        totalPrice
      };
      
      onBookTicket(ticketData);
      setShowSummary(true);
    }
  };

  if (showSummary) {
    return (
      <div className="modal" style={{ background: 'rgba(0,0,0,0.8)' }}>
        <div className="modal-content" style={{ maxWidth: '500px' }}>
          <h2 style={{ color: '#28a745' }}>🎉 Booking Confirmed!</h2>
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <QRCode value={JSON.stringify({ ticketId: item.id, qrCode: `TICKET_${Date.now()}` })} size={200} />
          </div>
          <div style={{ 
            background: '#d4edda', padding: '1.5rem', borderRadius: '12px', margin: '1rem 0',
            border: '2px solid #c3e6cb'
          }}>
            <div style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              <strong>{item.title}</strong>
            </div>
            <p><strong>Tickets:</strong> {quantity}</p>
            <p><strong>Location:</strong> {selectedLocation}</p>
            {type === 'movie' && <p><strong>Seats:</strong> {selectedSeats.join(', ')}</p>}
            {selectedFood.length > 0 && (
              <p><strong>Food:</strong> {selectedFood.map(f => f.name).join(', ')}</p>
            )}
            <p style={{ fontSize: '1.3rem', color: '#28a745', fontWeight: 'bold', marginTop: '1rem' }}>
              💰 Total: ₹{totalPrice.toLocaleString()}
            </p>
          </div>
          <button className="btn btn-primary" onClick={onClose}>✅ Show QR at Entry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal" style={{ background: 'rgba(0,0,0,0.8)' }}>
      <div className="modal-content" style={{ maxHeight: '90vh', overflowY: 'auto', maxWidth: '550px' }}>
        <h2>🎫 Book "{item?.title || 'Event'}"</h2>
        
        {/* Event Info */}
        <div style={{ 
          background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', textAlign: 'center'
        }}>
          <h3>{item?.title}</h3>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>₹{item?.price}/ticket | {item?.language}</p>
        </div>

        {/* Quantity */}
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label><strong>📊 Number of Tickets</strong></label>
          <input 
            type="number" 
            min="1" max="25"
            value={quantity}
            onChange={(e) => {
              const val = Math.max(1, Math.min(25, parseInt(e.target.value) || 1));
              setQuantity(val);
              setSelectedSeats([]); // Reset seats
            }}
            style={{ 
              width: '100%', padding: '1rem', border: '2px solid #ddd', 
              borderRadius: '8px', fontSize: '1.1rem', marginTop: '0.5rem'
            }}
          />
          {errors.quantity && <div style={{ color: '#dc3545', fontSize: '0.9rem', marginTop: '0.25rem' }}>{errors.quantity}</div>}
        </div>

        {/* Location */}
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label><strong>📍 {type === 'movie' ? 'Theatre' : 'Location'}</strong></label>
          <select 
            value={selectedLocation}
            onChange={(e) => {
              setSelectedLocation(e.target.value);
              if (errors.location) clearErrors();
            }}
            style={{ 
              width: '100%', padding: '1rem', border: '2px solid #ddd', 
              borderRadius: '8px', fontSize: '1.1rem', marginTop: '0.5rem'
            }}
          >
            <option value="">Select location...</option>
            {locations.map((loc, i) => <option key={i} value={loc}>{loc}</option>)}
          </select>
          {errors.location && <div style={{ color: '#dc3545', fontSize: '0.9rem', marginTop: '0.25rem' }}>{errors.location}</div>}
        </div>

        {/* Seats - Movies Only */}
        {type === 'movie' && (
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label><strong>🎯 Select {quantity} Seat(s)</strong> ({selectedSeats.length}/{quantity})</label>
            <div style={{ 
              display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', 
              gap: '0.5rem', marginTop: '1rem', maxHeight: '200px', overflowY: 'auto'
            }}>
              {Array.from({ length: 25 }, (_, i) => {
                const seat = `A${i+1}`;
                const isSelected = selectedSeats.includes(seat);
                return (
                  <button
                    key={i}
                    onClick={() => toggleSeat(seat)}
                    disabled={selectedSeats.length >= quantity && !isSelected}
                    style={{
                      padding: '0.75rem',
                      border: `2px solid ${isSelected ? '#667eea' : '#ddd'}`,
                      borderRadius: '8px',
                      background: isSelected ? '#667eea' : 'white',
                      color: isSelected ? 'white' : '#333',
                      cursor: (selectedSeats.length >= quantity && !isSelected) ? 'not-allowed' : 'pointer',
                      opacity: (selectedSeats.length >= quantity && !isSelected) ? 0.5 : 1
                    }}
                  >
                    {seat}
                  </button>
                );
              })}
            </div>
            {errors.seats && <div style={{ color: '#dc3545', fontSize: '0.9rem', marginTop: '0.5rem' }}>{errors.seats}</div>}
          </div>
        )}

        {/* Food */}
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label><strong>🍿 Add Food Items</strong></label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
            {foods.map(food => {
              const isSelected = !!selectedFood.find(f => f.id === food.id);
              return (
                <button
                  key={food.id}
                  onClick={() => addFood(food)}
                  style={{
                    padding: '0.75rem 1rem',
                    border: `2px solid ${isSelected ? '#28a745' : '#ddd'}`,
                    borderRadius: '8px',
                    background: isSelected ? '#28a745' : 'white',
                    color: isSelected ? 'white' : '#333',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontSize: '0.9rem'
                  }}
                >
                  {food.name}<br/><small>₹{food.price}</small>
                </button>
              );
            })}
          </div>
        </div>

        {/* TOTAL PRICE */}
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea, #764ba2)', 
          color: 'white', 
          padding: '1.5rem', 
          borderRadius: '12px', 
          textAlign: 'center',
          marginBottom: '1.5rem',
          fontSize: '1.3rem',
          fontWeight: 'bold'
        }}>
          💰 TOTAL: ₹{totalPrice.toLocaleString()}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            className="btn" 
            onClick={onClose}
            style={{ 
              flex: 1, background: '#6c757d', color: 'white', padding: '1rem',
              borderRadius: '12px', border: 'none', fontSize: '1.1rem', cursor: 'pointer'
            }}
          >
            ❌ Cancel
          </button>
          <button 
            className="btn btn-primary"
            onClick={validateAndBook}
            disabled={!selectedLocation || (type === 'movie' && selectedSeats.length !== quantity)}
            style={{ 
              flex: 1, padding: '1rem', borderRadius: '12px', border: 'none', 
              fontSize: '1.1rem', cursor: 'pointer',
              opacity: !selectedLocation || (type === 'movie' && selectedSeats.length !== quantity) ? 0.6 : 1,
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)'
            }}
          >
            ✅ CONFIRM BOOKING
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketBookingModal;