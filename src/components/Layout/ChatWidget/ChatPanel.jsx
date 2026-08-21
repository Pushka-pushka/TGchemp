// src/components/layout/ChatWidget/ChatPanel.jsx
import { useState } from 'react';
import useChatStore from '../../store/chatStore';
import { queryAI } from '../../api/rag';

const ChatPanel = ({ onClose }) => {
  const { 
    messages, 
    isLoading, 
    context, 
    addMessage, 
    setLoading,
    currentObject // Добавим в стор
  } = useChatStore();
  
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { 
      text: input, 
      sender: 'user' 
    };
    addMessage(userMessage);
    setInput('');
    setLoading(true);

    try {
      // Формируем контекстный промпт
      let contextPrompt = input;
      
      if (context) {
        // Добавляем контекст из стора
        contextPrompt = `${context}`;
        
        // Если есть выбранный объект в редакторе
        if (currentObject) {
          contextPrompt += ` Текущий объект на схеме: ${currentObject.name} (ID: ${currentObject.object_id}).`;
        }
        
        contextPrompt += ` Вопрос пользователя: ${input}`;
      }
      
      const response = await queryAI({ question: contextPrompt });
      
      addMessage({ 
        text: response.data.answer, 
        sender: 'ai',
        timestamp: response.data.created_at,
      });
    } catch (error) {
      console.error('Chat error:', error);
      addMessage({ 
        text: '❌ Не удалось получить ответ от нейросети. Попробуйте позже.', 
        sender: 'ai',
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <span>🤖 ИИ-ассистент КТК</span>
        <button onClick={onClose}>✕</button>
      </div>
      
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-welcome">
            <p>👋 Задайте вопрос по работе с установкой ЭЛОУ-АВТ</p>
            {context && (
              <p className="chat-context">📍 Контекст: {context}</p>
            )}
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            <div className="message-content">{msg.text}</div>
            {msg.timestamp && (
              <div className="message-time">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            )}
          </div>
        ))}
        {isLoading && <div className="message ai loading">Думаю...</div>}
      </div>
      
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Спросите у ИИ-ассистента..."
        />
        <button 
          onClick={handleSend} 
          disabled={isLoading || !input.trim()}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
