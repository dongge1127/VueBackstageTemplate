import request from "@/utils/request";
// 登录
export function login(data) {
  return request({
    url: "/vue-admin-template/user/login",
    method: "post",
    data,
  });
}
// 获取用户信息
export function getInfo(token) {
  return request({
    url: "/vue-admin-template/user/info",
    method: "get",
    params: { token },
  });
}
// 获取权限菜单
export function getMenus(params) {
  return request({
    url: "/vue-admin-template/user/menu",
    method: "post",
    params,
  });
}
// 退出登录
export function logout() {
  return request({
    url: "/vue-admin-template/user/logout",
    method: "post",
  });
}
