import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Store = {
  username: string;
  token: string;
  setUsername: (username: string) => void;
  setToken: (token: string) => void;
}

export const userStore = create<Store>()(
  persist(
    (set) => ({
      username: '',
      token: '',
      setUsername: (username) => set({ username }),
      setToken: (token) => set({ token }),
    }),
    {
      name: 'username-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)


