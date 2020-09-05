const server = {
  api: 'http://localhost:1337'
}
switch (process.env.TARGET) {
  case 'localhost':
    server.api = 'http://localhost:1337'
    break
  case 'unstable':
    server.api = 'https://853506df1a4c.ngrok.io'
    break
  default:
    server.api = 'http://localhost:1337'
}

export default {
  server: server.api,
  gateway: server
}
