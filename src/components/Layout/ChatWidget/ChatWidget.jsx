// src/components/layout/ChatWidget/ChatWidget.jsx
import { useState } from 'react';
import ChatButton from './ChatButton';
import ChatPanel from './ChatPanel';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat-widget">
      {isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}
      <ChatButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
    </div>
  );
};

export default ChatWidget;