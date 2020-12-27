import RTCState from './RTCState'

export default class RTCStartState extends RTCState {
  constructor(connection: RTCPeerConnection) {
    super(connection)
  }

  async addUserMedia() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    stream
      .getTracks()
      .forEach((track) => this._connection.addTrack(track, stream))
  }

  async getOffer() {
    const offer: RTCSessionDescriptionInit = await this._connection.createOffer()

    await this._connection.setLocalDescription(offer)

    return offer
  }
}
