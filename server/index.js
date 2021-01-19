require('ignore-styles')
require('@babel/register')({ // przekazujemy opcje do babel register
    ignore: [/(node_modules)/], // ignorujemy node-modules
    presets: ['@babel/preset-env', '@babel/preset-react'] // przekazujemy zainstalowane presety
})

require('./server')