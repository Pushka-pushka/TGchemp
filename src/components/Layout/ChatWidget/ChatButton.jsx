// src/components/layout/ChatWidget/ChatButton.jsx
const ChatButton = ({ onClick, isOpen }) => {
    return (
      <button 
        className="chat-button" 
        onClick={onClick}
        aria-label={isOpen ? "Закрыть чат" : "Открыть чат"}
      >
        {isOpen ? '✕' : '💬'}
      </button>
    );
  };
  
  export default ChatButton;