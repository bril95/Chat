import userStore from "./userStore";

export const useGetUsername = () => {
  return userStore((state) => state.username);
};

export const useGetToken = () => {
  return userStore((state) => state.token);
};

export const useSetUsername = () => {
  return userStore((state) => state.setUsername);
};

export const useSetToken = () => {
  return userStore((state) => state.setToken);
};
