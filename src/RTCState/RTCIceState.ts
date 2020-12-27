import RTCState from './RTCState'

export default class RTCIceState extends RTCState {
  constructor(connection: RTCPeerConnection) {
    super(connection)
  }
}
