module.exports = {
  // chainWebpack: config => {
  //   // MD Loader
  //   config.module
  //     .rule('md')
  //     .test(/\.md$/i)
  //     .use('raw-loader')
  //     .loader('raw-loader')
  //     .end()
  // },
  pages: {
    index: 'src/main.ts',
    articles: 'src/main.ts',
    article: 'src/main.ts'
  },
  runtimeCompiler: true
}
