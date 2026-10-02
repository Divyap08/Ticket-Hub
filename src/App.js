import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import Movies from './components/Movies';
import Events from './components/Events';
import Profile from './components/Profile';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedTickets = localStorage.getItem('tickets');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTickets) setTickets(JSON.parse(savedTickets));
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleRegister = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleBookTicket = (ticketData) => {
    setTickets([...tickets, { ...ticketData, user: user?.email }]);
  };

  const handleCancelTicket = (ticketId) => {
    setTickets(tickets.filter(ticket => ticket.id !== ticketId));
  };

  return (
    <Router>
      <div className="App">
        {user && <Navbar user={user} tickets={tickets} onLogout={handleLogout} />}
        <main className="main-content">
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route 
              path="/login" 
              element={
                user ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/register" 
              element={
                user ? <Navigate to="/home" /> : <RegisterPage onRegister={handleRegister} />
              } 
            />

            {/* PROTECTED ROUTES - LOGIN REQUIRED */}
            <Route 
              path="/" 
              element={
                user ? <HomePage onBookTicket={handleBookTicket} tickets={tickets} user={user} /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/home" 
              element={
                user ? <HomePage onBookTicket={handleBookTicket} tickets={tickets} user={user} /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/movies" 
              element={
                user ? <Movies onBookTicket={handleBookTicket} user={user} /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/events" 
              element={
                user ? <Events onBookTicket={handleBookTicket} user={user} /> : <Navigate to="/login" />
              } 
            />
            <Route 
              path="/profile" 
              element={
                user ? (
                  <Profile 
                    user={user} 
                    tickets={tickets} 
                    onLogout={handleLogout}
                    onCancelTicket={handleCancelTicket}
                  />
                ) : <Navigate to="/login" />
              } 
            />

            {/* CATCH ALL - Redirect to login if not logged in */}
            <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;