
const url = 'http://s.cd1a.cn/public/index.php/operation'
const path = require('path');
const webpack = require("webpack");
const utils = {
  assetsPath: function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
      // 生产环境下的 static 路径
      ? 'static'
      // 开发环境下的 static 路径
      : 'static'

    return path.posix.join(assetsSubDirectory, _path)
  },
  resolve: function (dir) {
    return path.join(__dirname, '..', dir)
  }
}
module.exports = {
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  parallel: false,
  publicPath: './',
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    proxy: {
      '/index': {
        target: url, //目标接口域名
        secure: false, //false为http访问，true为https访问
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '/index': '' //重写接口
        }
      }
    }, // 设置代理
  }

}
