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

const register = async userData => {
  const url = state.server + '/auth/local/register'
  const { data } = await axios.post(url, userData)
  return data
}

const getPublicProfile = async id => {
  const url = state.server + '/profiles/' + id
  const { data } = await axios.get(url)
  return data
}

const getEventUserMedia = async (slug, profile) => {
  const url = state.server + `/profiles?event.slug=${slug}&isLive=true`
  const { data } = await axios.get(url)
  if (profile) {
    return data.filter(d => d.id !== profile)
  }
  return data
}

export const api = {
  login,
  register,
  getPublicProfile,
  getEventUserMedia,
  getAuthHeaders
}

Vue.prototype.$api = api
