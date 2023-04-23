<template>
  <div class="box-card-Header">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" active-text-color="#409EFF" router>
      <el-menu-item index="/about">关于我</el-menu-item>
      <el-menu-item index="/articles">学无止境</el-menu-item>
      <el-menu-item index="/compiler">文章分享</el-menu-item>
      <el-menu-item index="/user" v-if="$store.state.nickname">个人中心</el-menu-item>
    </el-menu>

    <div class="nickname" v-if="isLogin || nickname">
      <i class="el-icon-s-custom"></i>
      <span>{{ nickname }}</span>
      <img src="@/assets/2281.png_860.png" alt="欢迎" />
    </div>
    <div class="login" v-else>
      <el-button type="primary" @click="loginBtn('login')">登录</el-button>
      <el-button type="primary" @click="loginBtn('register')">注册</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeIndex: "/about"
    };
  },
  created() {
    this.setCurrentRoute()

  },
  methods: {
    loginBtn(data) {
      this.$store.dispatch("modal/formType", data);
    },
    setCurrentRoute() {
      if (this.$route.path.match(/^\/articles/)?.[0]) {
        this.activeIndex = this.$route.path.match(/^\/articles/)[0]
        return false
      }
      this.activeIndex = this.$route.path
    }
  },
  computed: {
    ...mapState(["isLogin", "nickname"]),
  },
  watch: {
    $route() {
      this.setCurrentRoute()
    }
  }
};
</script>

<style scoped lang="less">
/deep/.el-menu .el-menu-item:hover {
  color: #2e95fb !important;
}

.box-card-Header {
  display: flex;
  justify-content: space-between;
  margin: 15px;
  height: 60px;
  z-index: 5;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .el-menu {
    display: flex;
    justify-content: space-between;
    width: 80%;
    border-radius: 10px;

    .el-menu-item {
      font-size: 18px;
      font-weight: 700;
    }
  }

  .login {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    margin-right: 10px;
  }

  .nickname {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    color: #2e95fb;
    cursor: pointer;

    img {
      height: 100%;
    }

    span {
      font-size: 14px;
      margin-left: 10px;
    }
  }
}
</style>