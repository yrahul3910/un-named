import io from 'socket.io-client'
import Constants from './constants'

export default dependencies => {
  const { Vue, store } = dependencies
  const socket = io(store.state.config.server, { transports: ['websocket'] })

  const token = localStorage.getItem(Constants.token)
  if (token) socket.emit(Constants.auth, { data: token })

  socket.on(Constants.userUpdate, payload => {
    if (payload.status === Constants.authorized) {
      store.dispatch('user/buildstate', payload)
    } else {
      store.dispatch('user/buildstate', {
        status: Constants.unauthorized,
        data: null
      })
    }
  })

  Vue.prototype.$socket = socket
}
