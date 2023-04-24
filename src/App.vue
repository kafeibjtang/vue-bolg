<template>
  <div id="app" class="page-component__scroll el-scrollbar__wrap">
    <Home />
    <el-backtop target="#app" :bottom="100" :right="400">
      <div class="backtop">
        <svg t="1682316538381" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="2159" width="32" height="32">
          <path
            d="M832 64H192c-17.6 0-32 14.4-32 32s14.4 32 32 32h640c17.6 0 32-14.4 32-32s-14.4-32-32-32zM852.484 519.469L538.592 205.577a30.79 30.79 0 0 0-3.693-4.476c-6.241-6.241-14.556-9.258-22.899-9.09-8.343-0.168-16.658 2.849-22.899 9.09a30.778 30.778 0 0 0-3.693 4.476L171.419 519.566C164.449 525.448 160 534.228 160 544c0 0.058 0.004 0.115 0.004 0.172-0.124 8.285 2.899 16.529 9.096 22.727 6.202 6.202 14.453 9.224 22.743 9.096 0.066 0 0.131 0.005 0.197 0.005H352v320c0 35.2 28.8 64 64 64h192c35.2 0 64-28.8 64-64V576h160c0.058 0 0.115-0.004 0.172-0.004 8.285 0.124 16.529-2.899 22.727-9.096 6.198-6.198 9.22-14.442 9.096-22.727 0-0.058 0.004-0.115 0.004-0.172 0.001-9.826-4.489-18.65-11.515-24.532z"
            p-id="2160" fill="#ffffff"></path>
        </svg>
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

.el-backtop {
  width: 60px;
  height: 60px;

  .backtop {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: #0cc471;
    box-shadow: 0 0 6px rgba(0, 0, 0, .12);
    text-align: center;
    line-height: 40px;
    color: #1989fa;
    border-radius: 50%;
  }
}
</style>
