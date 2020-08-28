const server = {
  api: 'http://localhost:1337'
}

switch (window.unnamed.target) {
  case 'local':
    server.api = 'http://localhost:1337'
    break
  case 'test':
    server.api = 'https://7744576baa6c.ngrok.io'
    break
  default:
    server.api = 'http://localhost:1337'
}

export default {
  server: server.api,
  gateway: server
}
