import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type UserStore } from './interfaces/StoreInterface';

const userStore = create<UserStore>()(
  persist(
    (set) => ({
      username: '',
      token: '',
      currentLang: 'ru',
      setUsername: (username) => {
        set({ username });
      },
      setToken: (token) => {
        set({ token });
      },
      setCurrentLang: (currentLang) => {
        set({ currentLang });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default userStore;
