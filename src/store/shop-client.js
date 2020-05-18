import Vue from 'vue'
import Vuex from 'vuex'
import { Shopclient } from '../api/shop-client'
import { HTTP } from '../api/common'

import {
  ADD_SHOPCLIENT,
  REMOVE_SHOPCLIENT,
  SET_SHOPCLIENTS,
} from './mutation-types.js'

const TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY'
const t = localStorage.getItem(TOKEN_STORAGE_KEY)
HTTP.defaults.headers.Authorization = `Bearer ${t}`

Vue.use(Vuex)

// State
const state = {
  shopclients: [],
}
// Getters
const getters = {
  shopclients: state => state.shopclients,
}
// Mutations
const mutations = {
  [ADD_SHOPCLIENT] (state, item) {
    state.shopclients = [item, ...state.shopclients]
  },
  [REMOVE_SHOPCLIENT] (state, id) {
    state.shopclients = state.shopclients.filter(item => {
      return item.id !== id
    })
  },
  [SET_SHOPCLIENTS] (state, { shopclients }) {
    state.shopclients = shopclients
  },
}
// Actions
const actions = {
  async createShopclient ({ commit }, payload) {
    try {
      const shopclient = await Shopclient.createShopclient(payload)
      commit(ADD_SHOPCLIENT, shopclient)
    } catch (error) {
      console.error(error)
    }
  },
  async deleteShopclient ({ commit }, id) {
    try {
      await Shopclient.deleteShopclient(id)
      commit(REMOVE_SHOPCLIENT, id)
    } catch (error) {
      console.error(error)
    }
  },
  async getShopclients ({ commit }) {
    try {
      const shopclients = await Shopclient.listShopclients()
      commit(SET_SHOPCLIENTS, { shopclients })
    } catch (error) {
      console.error(error)
    }
  },

}

export const shopclient = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
