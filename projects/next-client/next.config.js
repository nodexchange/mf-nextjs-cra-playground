const deps = require('./package.json').dependencies
const path = require('path')
const webpack = require('webpack')

const {withModuleFederation, MergeRuntime} = require('@module-federation/nextjs-mf')
module.exports = {
  webpack: (config, options) => {
    const {buildId, dev, isServer, defaultLoaders, webpack} = options
    // config.output.publicPath = 'auto'
    const mfConf = {
      mergeRuntime: true, //experimental
      name: 'nextClient',
      library: {type: config.output.libraryTarget, name: 'nextClient'},
      filename: 'static/runtime/remoteEntry.js',
      remotes: {},
      exposes: {
        './nav': './components/nav',
      },
    }

    config.plugins.push(new MergeRuntime({filename: 'remoteEntry'}))
    withModuleFederation(config, options, mfConf)

    if (!isServer) {
      config.output.publicPath = 'http://localhost:3005/_next/'
    }

    config.plugins.push(
      new webpack.ProvidePlugin({
        react: 'React',
      }),
    )

    return config
  },

  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config
  },
}
