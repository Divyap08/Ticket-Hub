import React, { useState } from 'react';

function HomePage({ onBookTicket, tickets, user }) {
  const [showAI, setShowAI] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const currentTime = new Date().getHours();
  const greeting = currentTime < 12 ? 'Good Morning' : 
                   currentTime < 17 ? 'Good Afternoon' : 'Good Evening';

  const happyMovies = ['3 Idiots', 'Zindagi Na Milegi Dobara', 'Dil Chahta Hai', 'Dilwale Dulhania Le Jayenge'];
  const horrorMovies = ['Hereditary', 'Train to Busan', 'Halloween', 'Friday', 'Conjuring'];
  const adventureMovies = ['Jurassic Park', 'Jumanji', 'Raiders of the Lost Ark', 'Spider man', 'Up'];
  const sportsEvents = ['Cricket', 'Kabaddi', 'Badminton', 'Football (Soccer)', 'Hockey'];

  const addMessage = (text, isUser = false) => {
    const newMessage = {
      text: text,
      isUser: isUser,
      id: Date.now() + Math.random()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = () => {
    if (!userInput.trim()) return;

    const userMsg = userInput.toLowerCase().trim();
    addMessage(userInput, true);
    setUserInput('');

    // Thanks response
    if (userMsg.includes('thanks') || userMsg.includes('thank')) {
      setTimeout(() => addMessage('Welcome!'), 500);
      return;
    }

    // Suggest new/famous movie
    if (userMsg.includes('suggest new') || userMsg.includes('new movie') || userMsg.includes('famous movie')) {
      setTimeout(() => {
        addMessage('New & Famous movie:\n• Dhurandhar (Latest spy thriller)');
      }, 500);
      return;
    }

    // Dhurandhar summary
    if (userMsg.includes('dhurandhar') || (userMsg.includes('summary') && userMsg.includes('movie'))) {
      setTimeout(() => {
        addMessage(`Dhurandhar Movie Summary:\n• Indian spy Hamza infiltrates Karachi gangs\n• Works with gangster Rehman Dakait\n• Uncovers Pakistan terror plans against India\n• Betrays Rehman in epic climax\n• Part 1 of 2-movie series\n• Action-packed spy thriller starring Ranveer Singh`);
      }, 500);
      return;
    }

    // Greeting response
    if (userMsg.includes('hello') || userMsg.includes('hi') || userMsg.includes('hey')) {
      setTimeout(() => {
        addMessage(`Hello! ${greeting}!`);
        setTimeout(() => addMessage(' What you want to watch?'), 800);
      }, 500);
      return;
    }

    if (userMsg.includes('how are you') || userMsg.includes('how r u') || userMsg.includes('how r u?')) {
      setTimeout(() => {
        addMessage(`I am Good! How can I help you?`);
      }, 500);
      return;
    }

    if (userMsg.includes('suggest me low cost movie') || userMsg.includes('affordable movie') || userMsg.includes('movie in less price')) {
      setTimeout(() => {
        addMessage(`Here budget friendly movies:\n• 3Idiots and Jawan`);
      }, 500);
      return;
    }
   
    if (userMsg.includes('suggest me low cost snacks') || userMsg.includes('affordable snacks') || userMsg.includes('snacks in less price')) {
      setTimeout(() => {
        addMessage(`Here budget friendly snacks:\n• Hot Drink(Price=100) and Ice-cream (Price=80)`);
      }, 500);
      return;
    }

    if (userMsg.includes('nothing') || userMsg.includes('bye')  || userMsg.includes('good bye')) {
      setTimeout(() => {
        addMessage(`Okay...Have a Great Day`);
      }, 500);
      return;
    }


    // Happy movies
    if (userMsg.includes('happy')) {
      setTimeout(() => {
        addMessage(`Happy movies:\n• ${happyMovies.join('\n• ')}`);
      }, 500);
      return;
    }

    // Horror movies
    if (userMsg.includes('horror')) {
      setTimeout(() => {
        addMessage(`Horror movies:\n• ${horrorMovies.join('\n• ')}`);
      }, 500);
      return;
    }

    // Adventure movies
    if (userMsg.includes('adventure')) {
      setTimeout(() => {
        addMessage(`Adventure movies:\n• ${adventureMovies.join('\n• ')}`);
      }, 500);
      return;
    }

    // Sports events
    if (userMsg.includes('sports')) {
      setTimeout(() => {
        addMessage(`Sports events:\n• ${sportsEvents.join('\n• ')}`);
      }, 500);
      return;
    }


    // Fallback
    setTimeout(() => {
      addMessage("Currently I'm learning...i can help you for finding above: •happy movies, •horror movies, •adventure movies, •sports, •new movie, •affordable movie, •affordable snacks ");
    }, 500);
  };

  const openAIChat = () => {
    setShowAI(true);
    setMessages([]);
    setTimeout(() => addMessage(`Hello! ${greeting}! How can I help you?`), 300);
    setTimeout(() => addMessage('What you want to watch?'), 800);
  };

  return (
    <div className="main-content">
      <div className="hero">
        <h1><b>Discover Amazing Events</b></h1>
        <p>Book tickets for movies, live concerts, and sports events with just one click</p>
        
        <div className="ai-icon-section">
          <button className="ai-icon-btn" onClick={openAIChat}>
            🤖
          </button>
        </div>
      </div>

      {showAI && (
        <div className="ai-chat-modal">
          <div className="ai-chat-content">
            <button 
              className="close-ai" 
              onClick={() => {
                setShowAI(false);
                setMessages([]);
              }}
            >
              ✕
            </button>
            
            <div className="chat-messages" style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '2rem' }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.isUser ? 'user' : 'ai'}`}>
                  <div className="message-text">{msg.text}</div>
                </div>
              ))}
            </div>

            <div className="ai-input-section">
              <input
                type="text"
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="ai-input"
              />
              <button className="ai-submit-btn" onClick={handleSend}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;