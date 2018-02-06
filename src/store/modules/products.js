import { dropOrUpdateObjectById, generateIdByObject, findObjectById } from '@/helpers/helper'
import products from '@/data/products.js'

const state = {
  products: [],
  next_id: 0
}

const mutations = {
  'SET_PRODUCTS' (state, products) {
    state.products = products
    state.next_id = state.products.length + 1
  },
  'SAVE_PRODUCTS' (state, products) {
    state.next_id = generateIdByObject(products, state.next_id)
    state.products = products
  },
  'ADD_PRODUCT' (state, product) {
    state.products.unshift(product)
  },
  'DROP_PRODUCT' (state, id) {
    dropOrUpdateObjectById(state.products, id)
  },
  'UPDATE_PRODUCT' (state, payload) {
    dropOrUpdateObjectById(state.products, payload.id, payload.product)
  }
}

const actions = {
  addProduct: ({commit}, payload) => {
    commit('ADD_PRODUCT', payload)
  },
  setProducts: ({commit}) => {
    commit('SET_PRODUCTS', products)
  },
  saveProducts: ({commit}, products) => {
    commit('SAVE_PRODUCTS', products)
  },
  updateProduct: ({commit}, payload) => {
    commit('UPDATE_PRODUCT', payload)
  },
  dropProduct: ({commit}, payload) => {
    commit('DROP_PRODUCT', payload)
  }
}

const getters = {
  products: (state) => {
    return state.products
  },
  product: (state) => (id) => {
    return findObjectById(state.products, id)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
