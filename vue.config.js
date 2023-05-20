const { defineConfig } = require('@vue/cli-service');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionPlugin = require("compression-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production';

module.exports = defineConfig({
  publicPath: "",
  transpileDependencies: true,
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(new BundleAnalyzerPlugin());
     
   
    }
  },
  chainWebpack: config => {
    if (isProduction) {
      config.plugin("compression-webpack-plugin").use(new CompressionPlugin({
        test: /\.js$|\.css$|\.html$/,
        algorithm: "gzip",
        threshold: 10240,
        deleteOriginalAssets:false
      }))

      config.optimization.minimize(true);
     config.optimization.splitChunks({
            chunks: 'all'
      })
    }
  }
})
