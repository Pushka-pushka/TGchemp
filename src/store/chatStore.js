// src/store/chatStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useChatStore = create(
  persist(
    (set) => ({
      messages: [],
      isLoading: false,
      isOpen: false,
      context: null,
      currentObject: null, // Добавляем поле для текущего объекта
      
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, { 
            ...message, 
            timestamp: message.timestamp || new Date().toISOString() 
          }],
        })),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
      
      setContext: (context) => set({ context }),
      
      setCurrentObject: (object) => set({ currentObject: object }),
      
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'chat-storage',
    }
  )
);

export default useChatStore;
