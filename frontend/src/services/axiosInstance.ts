import axios from 'axios';
import userStore from '../store/userStore';
import routes from './routes';

const axiosInstance = axios.create({
  baseURL: routes.defaultApi(),
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const storageItem = sessionStorage.getItem('username-storage');
    if (storageItem !== null) {
      const storage = JSON.parse(storageItem);
      const token = storage.state.token;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    const url = response.config.url;
    if (url && (url.includes(routes.path.loginPath()) || url.includes(routes.path.signUpPath()))) {
      const { setToken, setUsername } = userStore.getState();
      const { token, username } = response.data;
      if (token && username) {
        setToken(token);
        setUsername(username);

        sessionStorage.setItem('username-storage', JSON.stringify({
          state: { token, username }
        }));
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
