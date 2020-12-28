/* const path = require('path')
const packagePath = path.join(path.resolve('./'), 'package.json')
const {dependencies} = require(packagePath)
console.log(packagePath) */

module.exports = ({config, env}) => {
  config.devServer.port(3333)
  config.devtool = 'eval-source-map'
  config.plugin('mf').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        name: 'newHost',
        // library: {type: 'var', name: 'staticHost'},
        filename: 'newemp.js',
        // shared: {...dependencies},
      },
    }
    return args
  })
}
