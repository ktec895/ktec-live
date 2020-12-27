import RTCState from './RTCState'

export default class RTCAnswerState extends RTCState {
  constructor(connection: RTCPeerConnection) {
    super(connection)
  }

  async addAnswer(answer: object) {
    this._connection.setRemoteDescription(answer)
  }
}
