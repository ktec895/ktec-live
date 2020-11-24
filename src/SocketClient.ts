const HOST = location.origin.replace(/^http/, 'ws')

export default class SocketClient {
  constructor() {
    console.log(HOST)
    this._socket = new WebSocket(HOST)
    this._events = new Map<string, (message: string) => void>()

    this._socket.onmessage = (event: MessageEvent) => this._handle(event.data)
  }

  on(event: string, handler: (message: string) => void) {
    this._events[event] = handler
  }

  send(event: string, data: any) {
    const message = {
      event,
      data,
    }

    this._socket.send(JSON.stringify(message))
  }

  _handle(message: string) {
    const parsed = JSON.parse(message)

    if (parsed.event && this._events[parsed.event])
      this._events[parsed.event](parsed.data)
  }

  _socket: WebSocket
  _events: Map<string, (message: string) => void>
}
