const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      title: '茶友道 ‧ 最貼心的茶伴'
    },
  },
  publicPath: '/ChaYouDao/'
})
