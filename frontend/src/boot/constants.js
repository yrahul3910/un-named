import Vue from 'vue'

const constants = {
  token: '@token',
  auth: 'AUTH',
  userUpdate: 'UPDATE_USER',
  authorized: 'AUTHORIZED',
  unauthorized: 'UNAUTHORIZED'
}
Vue.prototype.$constants = constants
export default constants
