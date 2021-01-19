import express from 'express'
import path from 'path'
import fs from 'fs'
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import App from '../src/App'
import StyleContext from 'isomorphic-style-loader/StyleContext'

const app = express()
const PORT = process.env.PORT || 3001

app.get('/', (req, res) => { //symbol ^ - początek linii $- koniec linii - JEŻELI ZAMIAST GET UZYJEMY MIDDLEWARE ZE ŚCIEŻKĄ '^/$' TO NASZ KOMPONENT BĘDZIE WYŚWIETLANY NA KAŻDEJ STRONIE NAWET JAK WPISZEMY /HOME
    const css = new Set(path.resolve(__dirname, '..', 'build/static/css'));
    const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))
    const body = ReactDOMServer.renderToString(
        <StyleContext.Provider value={{ insertCss }}>
          <App />
        </StyleContext.Provider>
      )

      const html = `<!doctype html>
      <html>
        <head>
          <script src="client.js" defer></script>
          <style>${[...css].join('')}</style>
        </head>
        <body>
          <div id="root">${body}</div>
        </body>
      </html>`

    fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
        if(err) {
            console.log('something went wrong ', err)
            return res.status(500).send('better luck next time')
        }

        return res.status(200).send(html)

        // return res.send(
        //     data.replace(
        //         '<div id="root"></div>', //zamieniamy to
        //         `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>` // na to
        //     )
        // )
    })
}) 

app.use(express.static(path.resolve(__dirname, '..', 'build'))) // pozwala na serwowanie wszystkich plików statycznych z folderu build. Express.static() przyjmuje parametry dirname który wskazuje na ten folder w któym jest server.js kolejny oznacza że jedno directory wstecz i trzeci oznacza że z tego directory po '..' przechodzimy do build

app.listen(PORT, () => {
    console.log(`App running on ${PORT}`)
})

// aby nasza aplikacja zadziałała musimy dodać możliwość obsługi jsx po stronie server a więc potrzebny jest nam babel i konkretne biblioteki
// npm i @babel/preset-env - umożliwia transpilację es2015+(es6) na starsze wersje es(ponizżej es6) co umożliwia wsparcia starszych przegląderk

// npm i @babel/preset-env - pozwala na używanie JSXA po stronie serwera

// npm i @babel/register - Ze względu na naturę modułów ES6, jeśli chcemy uruchomić Babel bez kroku budowania, takiego jak webpack i uruchamiać pliki używając babel 'w locie', musimy zarejestrować babel w środowisku wykonawczym NODE'a.
// require hook czyli haczyk wymagań przypisuje się do NODE'a i automatycznie kompiluje pliki. Jest to odpowiednik skryptu CoffeeScript’s - coffee-script/register. 

// npm i ignore-styles - jest to hook do @babel/register, który ignoruje importowane style podczas uruchamiania w środowisku NODE.
//JEst to dla projektów, które używają czegoś takiego jak Webpack, aby umożliwić importowanie CSS w JavaScript.

//CALOŚĆ NPM INSTALL ==== npm i @babel/preset-env @babel/preset-env @babel/register ignore-styles

//ABY TERAZ DODAĆ WSPARCIE BABEL utworzyliśmy plik index.js(zobacz co jest w nim)
//następnie w package.json dodajemy skrypt uruchamiający naszą aplikację przez index.js  ("ssr": "node server/index.js",)