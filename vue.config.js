module.exports = {
  chainWebpack: config => {
    // MD Loader
    config.module
      .rule('md')
      .test(/\.md$/i)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },
  pages: {
    index: 'src/main.js',
    articles: 'src/main.js',
    article: 'src/main.js'
  },
  runtimeCompiler: true
}
