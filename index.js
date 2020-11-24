const express = require('express')
const path = require('path')
const ip = require('ip')
const { Server } = require('ws')
const PORT = process.env.PORT || 8080

const app = express()
const server = require('http').createServer(app)
const wss = new Server({ server })

wss.on('connection', (ws) => {
  console.log('client connected')
  ws.on('close', () => console.log('client disconnected'))
})

app.use(express.static(path.join(__dirname, 'public')))

server.listen(PORT, () => {
  console.log(`Listening at http://${ip.address()}:${PORT}`)
})
