const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',  // 后台接口域名
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }

})
