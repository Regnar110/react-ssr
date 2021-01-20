const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {    
    context: path.resolve(__dirname),
    entry: ['./index.js'],
    output: {
      path: path.join('..', 'dist', 'build', 'static', 'js'),
      filename: 'bundle.min.js'
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          use: 'url-loader?limit=8192'
        }
      ]
    }
  }