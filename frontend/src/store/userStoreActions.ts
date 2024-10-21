import userStore from './userStore';

export const useGetUsername = () => {
  return userStore((state) => state.username);
};

export const useGetToken = () => {
  return userStore((state) => state.token);
};

export const useGetLang = () => {
  return userStore((state) => state.currentLang);
};

export const useSetUsername = () => {
  return userStore((state) => state.setUsername);
};

export const useSetToken = () => {
  return userStore((state) => state.setToken);
};

export const useSetLang = () => {
  return userStore((state) => state.setCurrentLang);
};
