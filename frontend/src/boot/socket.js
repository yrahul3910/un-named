import io from 'socket.io-client'
import constants from './constants'

export default dependencies => {
  const { Vue, store } = dependencies
  const socket = io(store.state.config.server, { transports: ['websocket'] })

  const token = localStorage.getItem(constants.token)
  if (token) socket.emit(constants.auth, { data: token })

  Vue.prototype.$socket = socket
}
