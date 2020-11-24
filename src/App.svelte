<script lang="ts">
  import SocketClient from './SocketClient'

  const ws = new SocketClient()
  ws.on('chads', (message) => console.log('message'))
</script>

<h1>Main</h1>
