import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const storageItem = sessionStorage.getItem('username-storage');
    if (storageItem !== null) {
      const storage = JSON.parse(storageItem);
      const token = storage.state?.token;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;