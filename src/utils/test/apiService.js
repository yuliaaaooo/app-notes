const axios = require("axios");
const { encrypt } = require("./utils");
//1. 画登录界面
//       上面三个选择按钮 =》 role
//       中间两个输入框email , password
//        是否记住复选框 =》 remember
//2. onFinish回调，当校验成功时回调函数
//        这时我们调用我们的login方法调后端登录
//        login(){  await http.post(params)}}
//3. 回调成功拿到后端给的userInfo
//        如果成功则保存userInfo到localstorage里
//        执行 storage.setUserInfo(data);
//4. 调其他函数有正确的Authorization,表示成功
const storage = {
  userInfo: null,
  setUserInfo(info) {
    this.userInfo = JSON.stringify(info);
  },
  getToken() {
    return JSON.parse(this.userInfo).token;
  },
};

const params = {
  email: "student@admin.com",
  password: "111111",
  remember: true,
  role: "student",
};
test();
async function test() {
  const data = await login(params);
  storage.setUserInfo(data.data.data);
  const token = storage.getToken();
  const baseURL = "http://cms.chtoma.com/api";
  const axiosInstance = axios.create({
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
          Authorization: "Bearer " + token,
        },
      };
    }

    return config;
  });

  axiosInstance
    .get("/statistics/student?userId=2", {
      email: "student@admin.com",
      password: "U2FsdGVkX1+tyYEcFwuRLcgzDrKwlsGjtE0Tl4+Wamc=",
      remember: true,
      role: "student",
    })
    .then((res) => {
      console.log(res.data);
    });
}

async function login() {
  const { password, ...rest } = params;
  const newParams = {
    ...rest,
    password: encrypt(password),
  };
  return axios.post("http://cms.chtoma.com/api/login", newParams);
}
