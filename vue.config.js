const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('network', resolve('src/network'))
      .set('utils', resolve('src/utils'))
  },
  devServer: {
    // host: '192.168.0.184', // ip
    //port: 8080, // 设置端口号
    //https: false, // https:{type:Boolean}
    // open: true, //配置自动启动浏览器
    proxy: {
      '/api': {     //这里最好有一个 /
        target: 'http://192.168.0.129:8360',  // 后台接口域名
        changeOrigin: true,  //是否跨域
      }
    }
  }
}
