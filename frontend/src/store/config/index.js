import Vue from 'vue'
import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

Vue.prototype.$config = state

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
