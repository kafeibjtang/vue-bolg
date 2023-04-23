<template >
  <div class="about-container">
    <Header />
    <div class="container">
      <router-view></router-view>
      <div class="aside">
        <ArticleSearch />
        <Aside />
      </div>
    </div>
    <Dialog />
    <div class="live">
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
.about-container {
  margin: 30px auto;
  position: relative;
  max-width: 1240px;
}

.container {
  display: flex;
}

.el-scrollbar__wrap {
  overflow: scroll;
  height: 100%;
}

.page-component__scroll {
  height: 500px;
}

.aside {
  flex: 2;
  position: sticky;
  top: 20px;
  left: 0;
  height: fit-content;
}
.live {
  position: fixed;
  top: 60vh;
  left: 0;
}
</style>