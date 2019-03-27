module.exports = {
  chainWebpack: config => {
    // MD Loader
    config.module
      .rule('md')
      .test(/\.md$/i)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  }
}
