import { create } from 'zustand';

const useSimStore = create((set) => ({
  sessionId: null,
  status: 'idle', // 'idle' | 'running' | 'paused' | 'passed' | 'failed'
  currentTick: 0,
  states: {}, // { char_id: { value, isAlarm } }
  setSession: (session) => set({ sessionId: session.id, status: session.status }),
  updateState: (newStates) => set((state) => ({ states: { ...state.states, ...newStates } })),
  setStatus: (status) => set({ status }),
}));

export default useSimStore;