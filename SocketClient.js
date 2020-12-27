module.exports = function SocketClient(socket) {
  const _socket = socket
  const _events = {}

  _socket.onmessage = (data) => handle(data)

  const on = (event, handler) => (_events[event] = handler)

  const send = (event, data) => _socket.send(JSON.stringify({ event, data }))

  const handle = (data) => {
    const parsed = JSON.parse(data)

    if (parsed.event && _events[parsed.event]) _event[parsed.event](parsed.data)
  }

  return { on, send }
}
