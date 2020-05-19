import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../api/auth'
import { User } from '../api/users'
import { HTTP } from '../api/common'

import {
  ADD_USER,
  REMOVE_USER,
  SET_USERS,
  LOGIN_BEGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  REMOVE_TOKEN,
  SET_TOKEN,
  SET_USER,
  SET_FULL_USER,
  PASSWORD_CHANGE_FAILURE,
  PASSWORD_CHANGE_SUCCESS,
  SET_THEME_COLOR,
  SET_ERROR
} from './mutation-types.js'

const TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY'
const THEME_COLOR_STORAGE_KEY = 'THEME_COLOR_STORAGE_KEY'
const CURRENT_USER_ID = 'CURRENT_USER_ID'

const t = localStorage.getItem(TOKEN_STORAGE_KEY)
//console.log(t)
HTTP.defaults.headers.Authorization = `Bearer ${t}`
//console.log(HTTP.defaults.headers.Authorization)

Vue.use(Vuex)
// State
const getDefaultState = () => {
  return {
    users: [],
    authenticating: false,
    error: false,
    request_error: null,
    token: localStorage.getItem(TOKEN_STORAGE_KEY),
    themeColor: localStorage.getItem(THEME_COLOR_STORAGE_KEY)
  }
}

const state = {
  users: [], // users list
  authenticating: false,
  request_error: null,
  error: null,
  token: localStorage.getItem(TOKEN_STORAGE_KEY),
  loginErrorMsg : null,
  userId: localStorage.getItem(CURRENT_USER_ID),
  user: null,
  userFull: null,
  passwordChangeSuccess: true,
  themeColor: localStorage.getItem(THEME_COLOR_STORAGE_KEY)
}
// Getters
const getters = {
  users: state => state.users, // get user list
  isAuthenticated: state => !!state.token,
  themeColor: state => state.themeColor,
  user: state=>state.user
}
// Mutations
const mutations = {
  [ADD_USER] (state, user) {
    state.users = [user, ...state.users]
  },

  [REMOVE_USER] (state, { id }) {
    state.users = state.users.filter(user => {
      return user.id !== id
    })
  },

  [SET_USERS] (state, { users }) {
    state.users = users
  },

  [LOGIN_BEGIN] (state) {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    delete HTTP.defaults.headers.Authorization
    state.token = null
    state.authenticating = true
    state.error = false
    state.loginErrorMsg = null
  },
  [LOGIN_FAILURE] (state, loginErrorMsg) {
    state.authenticating = false
    state.error = true
    state.loginErrorMsg = loginErrorMsg
  },
  [LOGIN_SUCCESS] (state) {
    state.authenticating = false
    state.error = false
  },
  [LOGOUT] (state) {
    state.authenticating = false
    state.error = false
  },
  [SET_TOKEN] (state, token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
    HTTP.defaults.headers.Authorization = `Bearer ${token}`
    //console.log(HTTP.defaults.headers.Authorization)
    state.token = token
  },
  [SET_USER] (state, user) {
    state.userId = user.id
    state.user = user
  },
  [SET_FULL_USER] (state, userFull) {
    state.userFull = userFull
  },
  [REMOVE_TOKEN] (state) {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    delete HTTP.defaults.headers.Authorization
    state.token = null
    state.user = null
    state.fullUser = null
  },
  [PASSWORD_CHANGE_FAILURE] (state) {
    state.passwordChangeSuccess = false
  },
  [PASSWORD_CHANGE_SUCCESS] (state) {
    state.passwordChangeSuccess = true
  },
  [SET_THEME_COLOR] (state, color) {
    localStorage.setItem(THEME_COLOR_STORAGE_KEY, color)
    state.themeColor = color
  },
  [SET_ERROR] (state, error) {
    state.request_error = error
  }

}
// Actions
const actions = {
  async createUser ({ commit }, userData) {
    try {
      commit(SET_ERROR, null)
      delete HTTP.defaults.headers.Authorization
      const user = await User.create(userData)
      if (!!state.token) {
        commit(SET_TOKEN, state.token)
      }
      else {
        commit(SET_TOKEN, null)
      }
      commit(ADD_USER, user)
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error.message)
    }
  },
  async deleteUser ({ commit }, user) {
    try {
      commit(SET_ERROR, null)
      await User.delete(user)
      commit(REMOVE_USER, user)
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error.message)
    }
  },
  async getUsers ({ commit }) {
    try {
      commit(SET_ERROR, null)
      const users = await User.list()
      await commit(SET_USERS, { users })
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error.message)
    }
  },
  async updateProfile ({ commit }, config) {
    try {
      commit(SET_ERROR, null)
      await User.updateUserPartial(config)
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error.message)
    }

  },

  async login ({ commit }, payload) {
    try {
      commit(LOGIN_BEGIN)
      const data = await auth.login(payload.email, payload.password)
      //console.log(data)
      commit(SET_TOKEN, data.data.token)

      localStorage.setItem(CURRENT_USER_ID, data.data.user.id)
      commit(SET_USER, data.data.user)
      commit(LOGIN_SUCCESS)
      //console.log(data.data.user.id)
    } catch (error) {
      commit(LOGIN_FAILURE, error.message)
    }
  },
  async logout ({ commit }) {
    try {
      await auth.logout()
      return await commit(LOGOUT)
    } catch (error) {
      console.error(error)
    } finally {
      commit(REMOVE_TOKEN)
    }
  },
  initialize ({ commit }) {
    try {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY)
      if (token) {
        commit(SET_TOKEN, token)
      } else {
        commit(REMOVE_TOKEN)
      }
    } catch (error) {
      console.error(error)
    }
  },
  async changePassword ({ commit }, payload) {
    try {
      commit(SET_ERROR, null)
      await auth.changeAccountPassword(payload.password, payload.password)
      commit(PASSWORD_CHANGE_SUCCESS)
    } catch (error) {
      commit(PASSWORD_CHANGE_FAILURE)
      console.error(error)
    }
  },
  setThemeColor ({ commit }, payload) {
      commit(SET_THEME_COLOR, payload)
  },
  async getCurrentUser ({ commit }) {
    try {
      commit(SET_ERROR, null)
      //console.log(state.userId)
      const user = await User.get(state.userId)
      //console.log(user)
      commit(SET_USER, user.data)
      //console.log(state.user)
    } catch (error) {
      console.error(error)
      commit(SET_ERROR, error.message)
    } finally {
      //console.log(state.userFull)
    }
  }
}
export const authuser = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
