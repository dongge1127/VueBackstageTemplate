<template>
  <div class="login">
    <count-up :end="9999" :options="{ duration: 3000 }"></count-up>
    <h1>登录</h1>
    <el-form ref="loginForm" :rules="formRule" :model="formData">
      <el-form-item prop="userName">
        <el-input
          v-model="formData.userName"
          type="text"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="请输入密码"
        />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click.native="handleLogin">
      <i class="el-icon-loading" style="font-size: 16px" v-if="loading"></i>
      <span v-else>登录</span>
    </el-button>
    <div class="prompt">用户名：admin&ensp;密码：不少于6位</div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { Message } from "element-ui";
import CountUp from "@/components/CountUp";

export default {
  name: "LoginPage",
  components: { CountUp },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      formData: {
        userName: "admin",
        password: "123456",
      },
      formRule: {
        userName: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      redirectPath: "",
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.redirectPath = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    handleLogin() {
      const that = this;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          that.loading = true;
          that.$store.dispatch("user/login", that.formData).then((res) => {
            console.log(res);
            Message.success("登录成功");
            setTimeout(() => {
              that.$router.push({ path: that.redirectPath || "/home" });
              that.loading = false;
            }, 1000);
          });
        } else {
          console.log("表单校验失败");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: aliceblue;

  h1 {
    margin-bottom: 20px;
  }

  .el-input {
    width: 320px;
  }

  .el-button {
    width: 320px;
  }
  .prompt {
    margin-top: 20px;
  }
}
</style>
