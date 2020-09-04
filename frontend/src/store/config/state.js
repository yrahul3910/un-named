const server = {
  api: 'http://localhost:1337'
}

console.log('process', process.env.TARGET)
switch (process.env.TARGET) {
  case 'localhost':
    server.api = 'http://localhost:1337'
    break
  case 'unstable':
    server.api = 'https://a55d16a43da1.ngrok.io'
    break
  default:
    server.api = 'http://localhost:1337'
}

export default {
  server: server.api,
  gateway: server
}
