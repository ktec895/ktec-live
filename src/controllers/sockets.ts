const HOST = location.origin.replace(/^http/, 'ws')

export default class SocketClient {
  constructor() {
    this._socket = new WebSocket(HOST)
    this._events = new Map<string, (data: object) => void>()

    this._socket.onmessage = (event: MessageEvent) => {
      this._handle(event.data)
    }
  }

  getSocket() {
    return this._socket
  }

  on(event: string, handler: (data: object) => void) {
    this._events[event] = handler
  }

  send(event: string, data: object) {
    this._socket.send(JSON.stringify({ event, data }))
  }

  _handle(message: string) {
    const parsed = JSON.parse(message)

    if (parsed.event && this._events[parsed.event])
      this._events[parsed.event](parsed.data)
  }

  _socket: WebSocket
  _events: Map<string, (data: object) => void>
}

export { SocketClient }
