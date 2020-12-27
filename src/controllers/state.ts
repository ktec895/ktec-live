abstract class RTCState {
  constructor(connection: RTCPeerConnection) {
    this._connection = connection
  }

  async addUserMedia(): Promise<void> {
    throw new Error('Not implemented')
  }

  async getOffer(): Promise<RTCSessionDescriptionInit> {
    throw new Error('Not implemented')
  }

  async addAnswer(answer: object): Promise<void> {
    throw new Error('Not implemented')
  }

  setOnIceCandidate(handler: (candidate: object) => void) {
    this._connection.onicecandidate = (event) => {
      if (event?.candidate) handler(event.candidate)
    }
  }

  getConnection(): RTCPeerConnection {
    return this._connection
  }

  _connection: RTCPeerConnection
}

class RTCAnswerState extends RTCState {
  constructor(connection: RTCPeerConnection) {
    super(connection)
  }

  async addAnswer(answer: object) {
    this._connection.setRemoteDescription(answer)
  }
}

class RTCStartState extends RTCState {
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

export { RTCState, RTCStartState, RTCAnswerState }
