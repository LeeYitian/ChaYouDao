const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js',
      title: '茶友道．最貼心的茶伴'
    },
  },
  publicPath: '/ChaYouDao/'
})
