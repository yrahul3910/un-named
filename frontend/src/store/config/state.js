const server = {
  api: 'http://localhost:1337'
}

switch (window.unnamed.target) {
  case 'local':
    server.api = 'http://localhost:1337'
    break
  case 'development':
    server.api = 'https://tfd-un-named.herokuapp.com'
    break
  default:
    server.api = 'http://localhost:1337'
}

export default {
  server: server.api,
  gateway: server
}
