import axios from "axios";
import storage from "./storage";
const baseURL = "http://cms.chtoma.com/api";
const axiosInstance = axios.create({
  //如果你的多个请求前缀都是相同的，那么你就可以使用baseUrl
  baseURL,
  withCredentials: true,
  responseType: "json",
});

// 添加请求拦截器
axiosInstance.interceptors.request.use((config) => {
  if (!config.url.includes("login")) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: "Bearer " + storage.token,
      },
    };
  }

  return config;
});

export default axiosInstance;
