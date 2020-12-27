export default abstract class RTCState {
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
