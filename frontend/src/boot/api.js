import Vue from 'vue'
import constants from './constants'
import axios from 'axios'

import state from '../store/config/state'

const getAuthHeaders = () => {
  const token = localStorage.getItem(constants.token)
  return {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
}

const login = async (identifier, password) => {
  const url = state.server + '/auth/local'
  const { data } = await axios.post(url, {
    identifier,
    password
  })
  return data
}

export const api = {
  login,
  getAuthHeaders
}

Vue.prototype.$api = api
