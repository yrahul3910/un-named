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
  votesUpdated: 'VOTES_UPDATED',
  change_password: 'CHANGE_PASSWORD',
  changed_password: 'CHANGED_PASSWORD',
  success: 'SUCCESS',
  failure: 'FAILURE'
}
Vue.prototype.$constants = constants
export default constants
