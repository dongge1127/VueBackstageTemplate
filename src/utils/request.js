import axios from "axios";
import { Message } from "element-ui";
import { getToken } from "@/utils/auth";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 12000,
});
service.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers["X-Token"] = getToken();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log("响应对象", response);
    if (response.status === 200 && res.code === "0000") {
      return res;
    } else {
      return Promise.reject(res);
    }
  },
  (error) => {
    Message.error("接口请求错误");
    return Promise.reject(error);
  }
);

export default service;
