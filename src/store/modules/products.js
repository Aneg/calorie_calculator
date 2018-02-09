import { dropOrUpdateObjectById, generateIdByObject } from '@/helpers/helper'
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
  setProducts: ({commit, getters}) => {
    products.map((el) => { el.hash = getters.getHash })
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
    console.log(state.products)
    return state.products
  },
  product: (state) => (id) => {
    console.log('ШЛЁП!!!')
    return state.products.find((el) => { return el.id === id })
  },
  totalCount: (state, getters) => (id, weight) => {
    let product = getters.product(id)
    return { name: product.name,
      protein: product.protein * weight / 100,
      fat: product.fat * weight / 100,
      carbohydrate: product.carbohydrate * weight / 100,
      calculus: product.calculus * weight / 100
    }
  },
  totalCountByName: (state, getters) => (id, name, weight) => {
    return getters.product(id)[name] * weight / 100
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
