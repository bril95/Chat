import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Store = {
  username: string;
  token: string;
  currentLang: 'en' | 'ru';
  setUsername: (username: string) => void;
  setToken: (token: string) => void;
  setCurrentLang: (lang: 'en' | 'ru') => void;
}

const userStore = create<Store>()(
  persist(
    (set) => ({
      username: '',
      token: '',
      currentLang: 'ru',
      setUsername: (username) => set({ username }),
      setToken: (token) => set({ token }),
      setCurrentLang: (currentLang) => set({ currentLang }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default userStore;
