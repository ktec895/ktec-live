import SocketClient from './SocketClient'

export default class AudioServer {
  constructor() {
    this._socket = new SocketClient()
    this._conn = new RTCPeerConnection()
  }

  authenticate() {
    // do token stuff
    this._socket.emit('authenticate')
  }

  async getAudioTracks() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    return stream.getAudioTracks()
  }

  addAudioTrack(track) {
    this._conn.addTrack(track)
  }

  async clientJoins() {
    const offer = await this._conn.createOffer()
    this._conn.setLocalDescription(offer)
    this._socket.emit('offer', { offer })
  }

  answerRecieved(answer) {
    this._conn.setRemoteDescription(answer)
  }

  _socket
  _conn
}
