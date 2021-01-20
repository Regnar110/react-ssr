require('ignore-styles') // odczytuje style. Bez tego wywali błąd w którym konsola wskaże na niezdefiniowane znaki w plikach np. css
require('@babel/register')({ // przekazujemy opcje do babel register
    ignore: [/(node_modules)/], // ignorujemy node-modules
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        {
          'plugins': ['@babel/plugin-proposal-class-properties']  
        }
        

    ], // przekazujemy zainstalowane presety

})

require('./server')