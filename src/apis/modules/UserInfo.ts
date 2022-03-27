import axios from '@/plugins/axios/interceptors';
// 账号&密码模式登陆
import { AxiosResponse } from 'axios';
type RES = Promise<AxiosResponse>;
type PAM = { [n: string]: string | number};

export function ApiUserAllSearch(params: PAM): RES {
  return  axios.get('users/getUsers', { params: params });
}

export function ApiCreateUser(params: PAM) :RES {
  return axios.post('users/createUserInfo', params);
}

export function ApiUpdateUser(params: PAM) :RES {
  return axios.post('users/updateUserInfo', params);
}

export function ApiDeleteUser(params: PAM) :RES {
  return axios.post('users/deleteUserInfo', params);
}
