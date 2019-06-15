module.exports = {
  devServer: {
    proxy: 'http://localhost:9000'
  },
  lintOnSave: false,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  runtimeCompiler: true
}
