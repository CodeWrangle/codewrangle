const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer
const CompressionPlugin = require('compression-webpack-plugin')
const { PRERENDER_KEY } = require('./config')
const zlib = require('zlib')

const productionPlugins = [
  new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, 'dist'),
    routes: ['/', '/about'],
    renderer: new Renderer({
      injectProperty: PRERENDER_KEY,
      inject: {
        prerendered: true
      },
      headless: true,
      renderAfterDocumentEvent: 'render-event'
    })
  }),
  new CompressionPlugin({
    filename: '[path].gz',
    algorithm: 'gzip',
    test: /\.(js|css|html)$/,
  }),
  new CompressionPlugin({
    filename: '[path].br',
    algorithm: 'brotliCompress',
    test: /\.(js|css|html|svg)$/,
    compressionOptions: {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      },
    },
  })
]

module.exports = {
  filenameHashing: true,
  lintOnSave: false,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(...productionPlugins)
    }
  },
}
