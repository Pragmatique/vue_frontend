import { HTTP } from './common'
export default {
  login (email, password) {
    return HTTP.post('/auth/login/', { email, password })
  },
  logout () {
    return HTTP.post('/auth/logout/', {})
  },
  createAccount (email, password1, password2) {
    return HTTP.post('/registration/', {
      email,
      password1,
      password2
    })
  },
  changeAccountPassword (password1, password2) {
    return HTTP.post('/auth/password/change/', { new_password1: password1, new_password2: password2})
  },
  sendAccountPasswordResetEmail (email) {
    return HTTP.post('/auth/password/reset/', { email })
  },
  resetAccountPassword (uid, token, newpassword1, newpassword2) {
    // eslint-disable-line camelcase
    return HTTP.post('/auth/password/reset/confirm/', {
      uid,
      token,
      newpassword1,
      newpassword2
    })
  },
//  getAccountDetails () {
//    return HTTP.get('/auth/user/')
//  },
//  updateAccountDetails (data) {
//    return HTTP.patch('/auth/user/', data)
//  },
//  verifyAccountEmail (key) {
//    return HTTP.post('/registration/verify-email/', { key })
//  }
}
