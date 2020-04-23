const http = require('http') // built-in modules
const fs = require('fs')
const path = require('path')

const server = http.createServer(function (request, response) {


  if (
    request.method === 'POST' &&
    request.headers["content-type"] === 'application/json'
  ) {


    const start = Date.now()
    let chunks = []
    
    
    
    request.on('data', (chunk) => {
      chunks.push(chunk)
      console.log(`parsed ${chunks.length} chunks`)
    })

    request.on('end', () => {
      const filePath = path.join(__dirname, `${start}`) + '.json'
      
      fs.writeFileSync(filePath, chunks, () => {
        console.log('Writing file is done')
      })

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