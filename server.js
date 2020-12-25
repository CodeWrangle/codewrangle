const express = require('express')
const app = express()

const helmet = require('helmet')
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ['self', 'localhost:8080'],
      scriptSrc: ['self', 'localhost:8080'],
      imgSrc: ['self', 'localhost:8080'],
      objectSrc: ['self', 'localhost:8080'],
      upgradeInsecureRequests: [],
    },
  })
)

const staticFileMiddleware = express.static('dist')
app.use(staticFileMiddleware)

const history = require('connect-history-api-fallback')
app.use(history({
  index: '/dist/index.html'
}))

// 2nd call for redirected requests
app.use(staticFileMiddleware)

app.listen(8080, function () {
  console.log('Example app listening on port 3000!')
})
