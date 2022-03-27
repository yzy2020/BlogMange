import Vue from 'vue'
import Vuex from 'vuex'
import { USERINFO  } from './types';

Vue.use(Vuex)

const createState = (): USERINFO => {
  return {
    realname: '',
    access_token: '',
    refresh_token: '',
    userId: '',
    authorities: [],
    openKeys: ['Index'],
    cacheList: [{ name: 'Home', title: '首页' }],
    usertypeList: [],
    isRoot: '',
    storeid: '',
    storeidnm: '',
    storeTree: [],
    isopen: '',
    routerTitle: ''
  };
};

export default new Vuex.Store({
  state:createState(),
  getters: {
  },
  mutations: {
    updateOpenKeys(state: USERINFO, data: string[]) { // 更新当前展开的子菜单列表
      state.openKeys = data;
    },
  },
  actions: {
  },
  modules: {
  }
})
