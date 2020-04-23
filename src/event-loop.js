const fs = require('fs')
const path = require('path')

const { logger } = require('./module.cjs')

function a() {
  logger('a')
}

function b() {
  logger('b')
}

function c() {
  logger('c')
}

function d() {
  logger('d')
}

function e() {
  logger('e')
}

function f() {
  logger('f')
}

function main() {
  a() // 1

  fs.readFile(path.join(__dirname, 'test.txt'), () => {
    setTimeout(() => console.log('2'), 0)
    setImmediate(() => console.log('1'))
  }) // 6

  setImmediate(b) // 4/5
  
  setTimeout(c, 0) // 4/5

  new Promise((res, rej) => { // 3 
    res()
  }).then(d)

  f() // 2
}

main()