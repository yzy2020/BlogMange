'use strict';

import Vue from 'vue';
import axios from 'axios';
import {
  message
} from 'ant-design-vue';
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: ''
  // timeout: 100,//60 * 1000,
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
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
    if (process.env.NODE_ENV === 'development') {
      console.log(response.request.custom.url, response);
    }
    message.destroy();
    if (response.data.code !== 'success') {
      message.error(response.data.message || 'Server Error!');
    }
    // if (process.env.VUE_APP_CURRENTMODE !== 'prod') {
    // 调试模式记录日志
    try {
      debug(response.status, response.statusText, JSON.stringify(response.request.custom.options), response.request.response);
    } catch (e) {
      debug(444, 'js error', JSON.stringify(response), 'js error');
    }
    // }
    return response;
  },
  function (error) {
    // Do something with response error
    message.destroy();
    message.error(error.message || 'Error');
    // if (process.env.VUE_APP_CURRENTMODE !== 'prod') {
    // 调试模式记录日志
    try {
      debug(error.status, error.statusText, JSON.stringify(error.request.custom.options), error.request.response);
    } catch (e) {
      debug(445, 'js error', JSON.stringify(error), 'js error');
    }
    // debug(error.status, error.statusText, JSON.stringify(error.request.custom.options), error.request.response);
    // }
    return Promise.reject(error);
  }
);

var Plugin = {};

Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;
