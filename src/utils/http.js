import axios from "axios";
import storage from "./storage";
const baseURL = "http://cms.chtoma.com/api";
//创建axios实例
const axiosInstance = axios.create({
  //如果你的多个请求前缀都是相同的，那么你就可以使用baseUrl
  baseURL,
  withCredentials: true,
  responseType: "json",
});

// 添加request请求拦截器
//网上例子：https://copyfuture.com/blogs-details/202207051356177427
// axiosInstance.interceptors.request.use((config) => {
//     if (store.state.token) {
//       config.headers["Authorization"] = `wruser ${store.state.token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
axiosInstance.interceptors.request.use((config) => {
  console.log("config", config);
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
