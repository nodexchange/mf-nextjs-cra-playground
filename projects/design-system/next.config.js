module.exports = {
  webpack: (config, options) => {
    if (options.isServer) return config
    const {webpack} = options
    // config.experiments = {topLevelAwait: true}
    config.output.publicPath = 'auto'
    config.plugins.push(
      new webpack.container.ModuleFederationPlugin({
        name: 'designsystem',
        // library: {type: config.output.libraryTarget, name: 'nextHost'},
        filename: 'static/runtime/designsystem.js',
        remotes: {},
        exposes: {
          './home': './components/home',
        },
      }),
    )
    // if (!options.isServer) {
    //   config.output.library = 'nextHost'
    // }
    // console.log(JSON.stringify(config, null, 2))
    // console.log(config)
    return config
  },
}
