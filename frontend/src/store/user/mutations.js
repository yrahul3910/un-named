export const buildstateSync = (state, { status, data }) => {
  state.status = status
  state.data = data
}

export const updateuserSync = (state, payload) => {
  state.data = payload
}
