import userStore from './userStore';
import { type UserStore, type Language } from './interface';

export const useGetUsername = (): string => {
  return userStore((state: UserStore) => state.username);
};

export const useGetToken = (): string => {
  // string
  return userStore((state: UserStore) => state.token);
};

export const useGetLang = (): string => {
  return userStore((state: UserStore) => state.currentLang);
};

export const useSetUsername = (): ((username: string) => void) => {
  return userStore((state: UserStore) => state.setUsername);
};

export const useSetToken = (): ((token: string) => void) => {
  // (token: string | null)
  return userStore((state: UserStore) => state.setToken);
};

export const useSetLang = (): ((lang: Language) => void) => {
  return userStore((state: UserStore) => state.setCurrentLang);
};
