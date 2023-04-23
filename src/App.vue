<template>
  <div id="app" class="page-component__scroll el-scrollbar__wrap">
    <Home />
    <el-backtop target="#app" :bottom="100">
      <div class="backtop">
        <i class="el-icon-upload2" style="color: orangered"></i>
      </div>
    </el-backtop>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
export default {
  components: {
    Home
  },
};
</script>

<style  lang="less">
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

body,
html {
  min-height: 100vh;
  height: 100%;
  color: #2e3e50;
  background: #f0f0f6;
  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth !important;
}

a {
  text-decoration: none;
}

.page-component__scroll,
.el-scrollbar__wrap {
  overflow: scroll;
  height: 100%;
}

@media (max-width: 1190px) {
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .box-card-aside {
    width: 80% !important;
    position: relative !important;
    margin: 0 15px 30px 15px !important;

    .about {
      padding: 10px !important;

      // ul {
      //   display: flex;
      //   justify-content: left;

      //   li {
      //     padding: 0 20px;
      //   }
      // }
    }
  }

  .box-card-conent {
    width: 80% !important;
  }
}

#app {
  background-image: url(@/assets/triangles-top-bd2d1e84.svg),
    url(@/assets/triangles-bottom-ef20ee5f.svg);
  background-position: left top, right bottom;
  background-repeat: no-repeat;
  background-size: inherit;
  box-sizing: border-box;
  color: #44566c;
  font-family: Archivo, sans-serif;
  min-height: 100vh;
}
</style>
