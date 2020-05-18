import { HTTP } from './common'
export const User = {
  create (config) {
    /* const headers = {
      'Content-Type': 'multipart/form-data'
    } */
    return HTTP.post('/users/register/', config).then(response => {
      return response.data
    })
  },
  delete (user) {
    return HTTP.delete(`/users/${user.id}/`)
  },
  get (id) {
    return HTTP.get(`/users/${id}/`)
  },
  list () {
    return HTTP.get('/users/').then(response => {
      return response.data
    })
  },
  updateUser (config) {
    const headers = {
      'Content-Type': 'multipart/form-data'
    }
    return HTTP.put(`/users/${config.id}/`, config.formData, headers).then(response => {
      return response.data
    })
  },
  updateUserPartial (config) {
    /* const headers = {
      'Content-Type': 'multipart/form-data'
    } */

    return HTTP.patch(`/users/update-partial/${config.id}/`, config).then(response => {
      return response.data
    })
  },
  changePassword (config) {
    return HTTP.patch(`/users/update-partial/${config.userId}/`, config.changeData)
  }
}
