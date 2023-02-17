import axios from "axios";
import storage from "../utils/storage";
import lodash from "lodash";
import { SubPath, RootPath } from "./PathConst";
import { encrypt } from "../utils/encrypt";
import { message } from "antd";

const baseURL = "http://cms.chtoma.com/api";

//创建axios实例
const axiosInstance = axios.create({
  //如果你的多个请求前缀都是相同的，那么你就可以使用baseUrl
  baseURL,
  withCredentials: true,
  responseType: "json",
});

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

class BaseApiService {
  /**
   * 处理 http 请求上的错误
   * 注意：此处返回的code是HTTP的状态码，并非后台自定义的code
   */
  errorHandler(err) {
    const msg = lodash.get(err, "response.data.msg", "unknown error");
    const code = lodash.get(err, "response.status", -1);
    //???
    if (!err.response) {
      console.error(
        "%c [ err ]-149",
        "font-size:13px; background:pink; color:#bf2c9f;",
        err
      );
    }

    return { msg, code };
  }

  getPath(path) {
    //Array.isArray() 用于确定传递的值是否是一个 Array。
    return !Array.isArray(path) ? String(path) : path.join("/");
  }
  async get(path, params) {
    path = this.getPath(path);
    //?
    path = !!params
      ? `${path}?${Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")}`
      : path;

    return axiosInstance
      .get(path)
      .then((res) => res.data)
      .catch((err) => this.errorHandler(err));
  }
  //使用async定义方法,该方法会返回一个Promise对象，哪里体现是Promise对象了，没有（reject）什么的，.then就是Promise啊！！
  async post(path, params) {
    return axiosInstance
      .post(this.getPath(path), params)
      .then((res) => res.data)
      .catch(this.errorHandler);
  }
  async delete(path) {
    return axiosInstance
      .delete(this.getPath(path))
      .then((res) => res.data)
      .catch(this.errorHandler);
  }
  async put(path, params) {
    return axiosInstance
      .put(this.getPath(path), params)
      .then((res) => res.data)
      .catch(this.errorHandler);
  }
  /**
   * 根据 HTTP 状态码判断请求是否成功
   */
  isError(code) {
    return !(
      code.toString().startsWith("2") || code.toString().startsWith("3")
    );
  }
  /**
   * 显示 Api 上的提示信息
   */
  showMessage =
    (isSuccessDisplay = false) =>
    (res) => {
      const { code, msg } = res;
      const isError = this.isError(code);

      if (isError) {
        message.error(msg);
      }

      if (isSuccessDisplay && !isError) {
        message.success(msg);
      }

      return res;
    };
}

class ApiService extends BaseApiService {
  login({ password, ...rest }) {
    return this.post(RootPath.login, {
      ...rest,
      password: encrypt(password),
    }).then(this.showMessage());
  }
  logout() {
    return this.post(RootPath.logout, {}).then(this.showMessage());
  }
  getStudents(req) {
    return this.get(RootPath.students, req);
  }
  //????
  getStudentById(id) {
    return this.get([RootPath.students, id]).then(this.showMessage());
  }
  addStudent(req) {
    return this.post([RootPath.students], req).then(this.showMessage(true));
  }
  //为什么要加[]
  updateStudent(req) {
    return this.put([RootPath.students], req).then(this.showMessage(true));
  }
  deleteStudent(id) {
    return this.delete([RootPath.students, id]).then(this.showMessage(true));
  }
  getCourses(req) {
    return this.get(RootPath.courses, req).then(this.showMessage());
  }
}
const service = new ApiService();
export default service;
