import React, { useEffect, useRef } from 'react';

const Carousel = ({ movies, onBookTicket }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const carouselRef = useRef();

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [movies.length]);

  // Smooth slide animation
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper" ref={carouselRef}>
        {movies.map((movie, index) => (
          <div key={movie.id} className="carousel-slide-large">
            <div 
              className="hero-poster"
              style={{ backgroundImage: `url(${movie.image})` }}
            />
            <div className="hero-overlay">
              <div className="hero-text">
                <h3>{movie.title}</h3>
                <p>{movie.genre} | ₹{movie.price}</p>
                <button 
                  className="hero-book-btn"
                  onClick={() => onBookTicket(movie, 'movie')}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Indicators */}
      <div className="carousel-indicators">
        {movies.map((_, index) => (
          <span
            key={index}
            className={currentIndex === index ? 'active' : ''}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;