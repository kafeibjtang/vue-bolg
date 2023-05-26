<template >
  <div class="about-container">
    <div class="container-left">
      <Header />
      <el-card class="containerCaed">
        <router-view></router-view>
      </el-card>
    </div>
    <div class="container">
      <div class="aside">
        <ArticleSearch />
        <Aside />
      </div>
    </div>
    <Dialog />
    <div class="live" v-if="$store.state.isMobile">
      <vueLive2d :size="350" />
    </div>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";
import Dialog from "@/components/Dialog.vue";
import ArticleSearch from "@/components/ArticleSearch.vue";
import vueLive2d from 'vue-live2d'

import { getPubKey } from "../api/index";
import { Message } from "element-ui";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Aside,
    Header,
    Dialog,
    ArticleSearch,
    vueLive2d

  },
  //判断会话是否存在公钥，如果没有，则重新请求
  mounted() {
    let key = sessionStorage.getItem("pubKey");
    if (!key || key === "undefined") {
      getPubKey().then((result) => {
        key = result.pubKey;
        key = key.replace(/\. +/g, "");
        key = key.replace(/[\r\n]/g, "");
        sessionStorage.setItem("pubKey", key);
      }).catch((err) => {
        Message.error(err);
        return Promise.reject(err);
      });
    }
  },
};
</script>

<style lang="less">
.el-card {
  flex: 6;
  margin: 0 15px;
  padding: 0;
  border-radius: 10px !important;

  .el-card__body {
    padding: 0 !important;
  }
}

.about-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 auto;
  margin-top: 30px;
  max-width: 1850px;

  .container-left {
    flex: 1;
  }

  .container {
    margin-top: 15px;
  }
}

.el-scrollbar__wrap {
  overflow: scroll;
  height: 100%;
}

.page-component__scroll {
  height: 500px;
}

.aside {
  position: sticky;
  top: 35px;
  left: 0;
  width: 350px;
}

.live {
  position: fixed;
  top: 60vh;
  right: 0;
}
</style>