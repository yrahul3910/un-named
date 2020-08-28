import Vue from 'vue'

const constants = {
  token: '@token',
  darkmode: '@darkmode',
  provider: '@provider',
  auth: 'AUTH',
  userUpdate: 'UPDATE_USER',
  authorized: 'AUTHORIZED',
  unauthorized: 'UNAUTHORIZED',
  vote: 'VOTE',
  votesUpdated: 'VOTES_UPDATED'
}
Vue.prototype.$constants = constants
export default constants
