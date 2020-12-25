const express = require('express')
const app = express()

const helmet = require('helmet')
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ['self', 'localhost:8080 codewranglesoftware.com'],
      scriptSrc: ['self', 'localhost:8080 codewranglesoftware.com'],
      imgSrc: ['self', 'localhost:8080 codewranglesoftware.com'],
      objectSrc: ['self', 'localhost:8080 codewranglesoftware.com'],
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
