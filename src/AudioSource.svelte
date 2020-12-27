<script lang="ts">
    import type RTCState from "./RTCState/RTCState";
    import RTCStartState from "./RTCState/RTCStartState";
    import RTCAnswerState from "./RTCState/RTCAnswerState";
    import RTCIceState from "./RTCState/RTCIceState";
    import SocketClient from "./SocketClient";

    const socket = new SocketClient();
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
    });
</script>
