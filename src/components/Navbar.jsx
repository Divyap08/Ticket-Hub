import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/home" className="logo">🎫 TicketHub</Link>
        <ul className="nav-links">
          <li><Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/movies" className={location.pathname === '/movies' ? 'active' : ''}>Movies</Link></li>
          <li><Link to="/events" className={location.pathname === '/events' ? 'active' : ''}>Live Events</Link></li>
          <li><Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Profile</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;