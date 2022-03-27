// 用户个人信息
export interface USERINFO {
  realname: string, // 用户姓名
  // eslint-disable-next-line camelcase
  access_token: string, // 令牌
  // eslint-disable-next-line camelcase
  refresh_token: string,
  userId: string, // 用户ID
  [name: string]: any,
  isRoot: string, // 是不是管理员
  storeid: string, // 商户id
  storeidnm: string, // 商户名字
  storeTree: [], // 商户号列表
  openKeys: string[], // 展开的菜单Keys组
  isopen: string // 是否营业
  
}