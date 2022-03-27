import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { LoginApi } from '@/apis';
import {
  message, Modal
} from 'ant-design-vue';
// 配置message
message.config({
  maxCount: 1 // 页面最多允许出现一个message
});
const whiteUrl: string[] = ['oauth/token?grant_type=password']; // 用于保存白名单接口
const config = {
  baseURL: `http://localhost:3000/`,
  timeout: 60 * 1000
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  async function (config) {
    message.destroy();
    message.loading('加载中...', 0);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    message.destroy();
    return response;
  },
  function (error) {
    // Do something with response error
    message.destroy();
    if ([401, 502].includes(error.response.status)) {
      if (!(error.config.url && whiteUrl.includes(error.config.url))) {
        Modal.destroyAll();
        Modal.info({
          title: '登录超时',
          content: '您的登陆会话已超时，请重新登录！',
          okText: '重新登录',
          onOk: () => {
            router.push({ name: 'Login' });
          }
        });
      }
    } else {
      message.error(error.response.data.message || error.response.data.error_description || error.message || 'Error');
    }
    return Promise.reject(error);
  }
);

/*
*刷新token
*/

export default _axios;
