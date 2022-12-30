import axios from 'axios';
const baseURL = 'http://cms.chtoma.com/api';
import storage from './storage';
const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    responseType: 'json',
});

axiosInstance.interceptors.request.use((config) => {
    if (!config.url.includes('login')) {
        return {
            ...config,
            headers: {
                ...config.headers,
                Authorization: 'Bearer ' + storage.token,
            },
        };
    }

    return config;
});

export default axiosInstance;