import axios, { AxiosInstance, Method } from 'axios';
import { message } from 'ant-design-vue';

type Params = {
  url: string;
  method: Method;
  data?: { [key: string]: any };
  params?: { [key: string]: any };
};

export default <T = any>(params: Params): Promise<T> => {
  // 创建 axios 实例
  const instance: AxiosInstance = axios.create({
    // API 请求的默认前缀
    baseURL: import.meta.env.VITE_APP_URL,
    timeout: 6000, // 请求超时时间
    withCredentials: true, // 携带cookie
  });

  // 异常拦截处理器
  const errorHandler = (error: any) => {
    return Promise.reject(error);
  };

  // 响应异常拦截处理器
  const resErrorHandler = (error: any) => {
    message.error(`网络超时，请稍后重试`);
    return errorHandler(error);
  };

  // request interceptor
  instance.interceptors.request.use((config) => {
    return config;
  }, errorHandler);

  // response interceptor
  instance.interceptors.response.use(async (response) => {
    if (response.status === 200) {
      return response.data;
      // if (response.data.code === 200) {
      //   return response.data;
      // } else {
      //   message.error(response.data.msg || `状态码：${response.data.code}`);
      //   return Promise.reject(response.data);
      // }
    }
  }, resErrorHandler);

  return instance(params);
};
