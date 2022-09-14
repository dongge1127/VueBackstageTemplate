import Cookies from "js-cookie";
const tokenKey = "vue_admin_template_token";
export function setToken(token) {
  Cookies.set(tokenKey, token);
}

export function getToken() {
  return Cookies.get(tokenKey);
}

export function removeToken() {
  Cookies.remove(tokenKey);
}
