const http = require('http') // built-in modules
const fs = require('fs')
const path = require('path')

const server = http.createServer((request, response) => {
  if (
    request.method === 'POST' &&
    request.headers["content-type"] === 'application/json'
  ) {
    const start = Date.now()
    const filePath = path.join(__dirname, `${start}`) + '.json'
    console.log(filePath)
    const wstream = fs.createWriteStream(filePath)

    let chunks = 0
    request.on('data', (chunk) => {
      wstream.write(chunk)
      console.log(`parsed ${++chunks} chunks`)
    })

    request.on('end', () => {
      wstream.end()

      response.statusCode = 200
      response.setHeader('Content-Type', 'text/html')
      response.end(`<b>PVH</b> Full-stack Community!\nWe got your data\n${Date.now() - start}`)
    })
  } else {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html')
    response.end('<b>PVH</b> Full-stack Community!\nSend a POST with application/json')
  }
})

const port = process.env.PORT || 8080

server.listen(port, () => {
  console.log(`server is listening on ${port}`)
})