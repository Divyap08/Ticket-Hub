import React from 'react';

const BookingModal = ({ booking, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>🎫 Ticket Booked Successfully!</h2>
        <div className="qr-code">📱</div>
        <p><strong>Event:</strong> {booking?.item?.title}</p>
        <p><strong>Booking ID:</strong> {booking?.qrCode}</p>
        <p><strong>Date:</strong> {booking?.date}</p>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          QR Code sent to your email. Show this at the entrance for entry.
        </p>
        <button className="btn btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingModal;  // ← THIS LINE IS CRITICAL!