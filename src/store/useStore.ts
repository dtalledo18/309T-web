import { create } from 'zustand';

interface AppState {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
}

export const useStore = create<AppState>((set) => ({
    theme: 'dark', // Empezamos en dark como el hero del mockup
    setTheme: (theme) => set({ theme }),
}));