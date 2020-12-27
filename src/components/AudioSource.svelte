<script lang="ts">
    import { RTCState, RTCAnswerState, RTCStartState } from "./state";
    import SocketClient from "./SocketClient";

    const socket = new SocketClient();
    const remoteStream = new MediaStream();
    const remoteAudio = document.querySelector("audio");
    let state: RTCState;

    socket.getSocket().onopen = (e: Event) => {
        const connection = new RTCPeerConnection();

        state = new RTCStartState(connection);
        state.addUserMedia();
    };

    socket.on("client", async (data: object) => {
        const offer = await state.getOffer();

        state.setOnIceCandidate((candidate) => {
            socket.send("candidate", candidate);
        });
        state = new RTCAnswerState(state.getConnection());
        socket.send("offer", offer);
    });

    socket.on("answer", async (answer) => {
        await state.addAnswer(answer);

        state.getConnection().ontrack = (event) =>
            remoteStream.addTrack(event.track);
        remoteAudio.srcObject = remoteStream;
    });
</script>

<audio controls>
    <track kind="captions" />
</audio>
