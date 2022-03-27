import axios from '@/plugins/axios/interceptors';
import store from '@/store';

// 账号&密码模式登陆
export function ApiLogin(username: string, password: string) {
  return new Promise((resolve, reject) => {
    axios.post('users/login', {
      username, password
    }).then((res: any) => { resolve(res) }).catch((e) => { reject(e) });
  });
}
