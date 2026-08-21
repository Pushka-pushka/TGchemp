// src/pages/ChatPage.jsx
import { useState } from 'react';
import { queryAI } from '../api/rag';
import ChatMessage from '../components/features/Chat/ChatMessage';
import ChatInput from '../components/features/Chat/ChatInput';
import useChatStore from '../store/chatStore';

const ChatPage = () => {
  const { messages, addMessage, setLoading, isLoading } = useChatStore();

  const handleSend = async (question) => {
    addMessage({ text: question, sender: 'user' });
    setLoading(true);

    try {
      const response = await queryAI(question);
      addMessage({
        text: response.data.answer,
        sender: 'ai',
        createdAt: response.data.created_at,
      });
    } catch (error) {
      addMessage({
        text: '❌ Ошибка получения ответа. Попробуйте позже.',
        sender: 'ai',
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} />
        ))}
      </div>
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
};