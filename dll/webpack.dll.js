const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vender: ['vue/dist/vue.esm.js', 'vue-router', 'axios', 'vuex', 'ant-design-vue']
  },
  output: {
    path: path.join(__dirname, '../public/static'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
}
