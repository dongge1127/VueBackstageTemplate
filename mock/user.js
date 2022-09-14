const { menuList } = require("./utils");
const tokens = {
  admin: {
    token: "admin-token",
  },
  editor: {
    token: "editor-token",
  },
};

const users = {
  "admin-token": {
    roles: ["admin"],
    introduction: "I am a super administrator",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Super Admin",
  },
  "editor-token": {
    roles: ["editor"],
    introduction: "I am an editor",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Normal Editor",
  },
};

module.exports = [
  // 登录
  {
    url: "/vue-admin-template/user/login",
    type: "post",
    response: (config) => {
      const { userName } = config.body;
      const token = tokens[userName];

      // mock error
      if (!token) {
        return {
          code: "9999",
          msg: "账号或密码错误",
          data: null,
        };
      }

      return {
        code: "0000",
        msg: "登录成功",
        data: token,
      };
    },
  },

  // 获取用户信息
  {
    url: "/vue-admin-template/user/info.*",
    type: "get",
    response: (config) => {
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: "9999",
          msg: "获取用户信息失败",
          data: null,
        };
      }

      return {
        code: "0000",
        data: info,
        msg: "获取用户信息成功",
      };
    },
  },

  // 获取权限菜单
  {
    url: "/vue-admin-template/user/menu",
    type: "post",
    response: () => {
      return {
        code: "0000",
        data: menuList,
        msg: "获取用户权限成功",
      };
    },
  },

  // 注销
  {
    url: "/vue-admin-template/user/logout",
    type: "post",
    response: () => {
      return {
        code: "0000",
        data: "退出成功",
      };
    },
  },
];
