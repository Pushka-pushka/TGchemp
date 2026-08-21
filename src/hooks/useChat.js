// src/hooks/useChat.js (для стриминга)
import { useState } from 'react';

export const useChat = () => {
  const [isStreaming, setIsStreaming] = useState(false);

  const sendStreamingQuestion = async (question, onChunk) => {
    setIsStreaming(true);
    const response = await fetch('http://localhost:8000/api/v1/query_stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      onChunk(chunk);
    }

    setIsStreaming(false);
  };

  return { sendStreamingQuestion, isStreaming };
};