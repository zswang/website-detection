const express = require('express')
const app = express()
const fs = require('fs')
const url = require('url')
const path = require('path')
const glob = require('glob')
const RealtimeConfig = require('rtconfig')
const util = require('util')
const spawn = require('child_process').spawn
const IO = require('socket.io')

var config = new RealtimeConfig('./config.js')

var port = parseInt(process.argv[2]) || 3000

app.use(express.static(path.join(__dirname, 'public')))

var wsPort = parseInt(process.argv[3]) || 3010

IO(wsPort, {
  path: config.wsPath
}).on('connection', (socket) => {
  socket.on('detection', (reply) => {
    var urlInfo = url.parse(reply.url)
    if (!(/^https?/.test(urlInfo.protocol))) {
      socket.emit('close')
      return
    }

    let phantomjs = spawn('phantomjs', ['open.phantom.js', reply.url])
    phantomjs.stdout.on('data', (data) => {
      var match = String(data).match(/(\w+):([^]*)/)
      if (match) {
        try {
          socket.emit('message', {
            data: {
              type: match[1],
              message: JSON.parse(match[2]),
            }
          })
        } catch(ex) {}
      }
    })

    phantomjs.on('close', function () {
      socket.emit('close')
    })
  })
})

app.listen(port)
console.log('^linenum http server listen: %j', port)

console.log('^linenum websocket server listen: %j', wsPort)