import Vue from 'vue'
import Vuex from 'vuex'
import { Shop } from '../api/shop'
import { HTTP } from '../api/common'

import {
  ADD_SHOP,
  REMOVE_SHOP,
  SET_SHOPS,
} from './mutation-types.js'

const TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY'
const t = localStorage.getItem(TOKEN_STORAGE_KEY)
HTTP.defaults.headers.Authorization = `Bearer ${t}`

Vue.use(Vuex)

// State
const state = {
  shops: [],
}
// Getters
const getters = {
  shops: state => state.shops,
}
// Mutations
const mutations = {
  [ADD_SHOP] (state, item) {
    state.shops = [item, ...state.shops]
  },
  [REMOVE_SHOP] (state, id) {
    state.shops = state.shops.filter(item => {
      return item.id !== id
    })
  },
  [SET_SHOPS] (state, { shops }) {
    state.shops = shops
  },
}
// Actions
const actions = {
  async createShop ({ commit }, payload) {
    try {
      const shop = await Shop.createShop(payload)
      commit(ADD_SHOP, shop)
    } catch (error) {
      console.error(error)
    }
  },
  async deleteShop ({ commit }, id) {
    try {
      await Shop.deleteShop(id)
      commit(REMOVE_SHOP, id)
    } catch (error) {
      console.error(error)
    }
  },
  async getShops ({ commit }) {
    try {
      const shops = await Shop.list()
      commit(SET_SHOPS, { shops })
    } catch (error) {
      console.error(error)
    }
  },

}

export const shop = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
