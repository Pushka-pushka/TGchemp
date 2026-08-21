// src/components/layout/ChatWidget/ChatWidget.jsx
import { useState } from 'react';
import ChatButton from './ChatButton';
import ChatPanel from './ChatPanel';
import useChatStore from '../../../store/chatStore';
import './ChatWidget.css';

const ChatWidget = () => {
  const { isOpen, toggleOpen } = useChatStore();

  return (
    <div className="chat-widget">
      {isOpen && <ChatPanel onClose={toggleOpen} />}
      <ChatButton onClick={toggleOpen} isOpen={isOpen} />
    </div>
  );
};

export default ChatWidget;