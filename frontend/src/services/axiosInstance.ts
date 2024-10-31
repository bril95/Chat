import axios from 'axios';
import userStore from '../store/userStore';
import routes from './routes';
import { type AuthResponse, type StorageItem } from '../store/interfaces/StoreInterface';

const axiosInstance = axios.create({
  baseURL: routes.defaultApi(),
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const storageItem = sessionStorage.getItem('user-storage');

    if (storageItem !== null) {
      const storage = JSON.parse(storageItem) as StorageItem;
      const token = storage.state.token;
      if (token !== '') {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const url = response.config.url;

    if (
      typeof url === 'string' &&
      url.trim() !== '' &&
      (url.includes(routes.path.loginPath()) || url.includes(routes.path.signUpPath()))
    ) {
      const { setToken, setUsername } = userStore.getState();
      const { token, username } = response.data as AuthResponse;

      if (token !== '' && username !== '') {
        setToken(token);
        setUsername(username);
      }
    }
    return response;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);

export default axiosInstance;
