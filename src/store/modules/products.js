import { dropOrUpdateObjectById, generateIdByObject } from '@/helpers/helper'
// import products from '@/data/products.js'
import axios from 'axios'

axios.defaults.baseURL = 'http://lara-project.local/api'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://lara-project.loca'
// axios.defaults.headers.post['Authorization'] = 'Bearer 5uP0n2cFKX80YMrew62JtvTky3dyIfayA41fT5OM0nIY9zjLVl9zMK0aUaDu'

const state = {
  products: [],
  next_id: 0
}

const mutations = {
  'SET_PRODUCTS' (state, products) {
    state.products = products
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
  'UPDATE_PRODUCT' (state, newProduct) {
    state.products = state.products.map((product) => {
      return product.id === newProduct.id ? newProduct : product
    })
  }
}

const actions = {
  addProduct: ({commit, getters}, id) => {
    return new Promise((resolve, reject) => {
      axios.post('/products/', id, {headers: {
        'Authorization': 'Bearer pirQdACQsW03yDzFiQziD2AIUzVbF9JT19JyslsFDjNRDau7Pd7YZygvzxYL'
      }}).then((response) => {
        debugger
        commit('ADD_PRODUCT', response.data.data)
        resolve()
      }, (err) => {
        debugger
        console.log(err)
        reject(err)
      })
    })
  },
  setProducts: ({commit, getters}, sync) => {
    axios.get('/products', {headers: {
      'Authorization': 'Bearer pirQdACQsW03yDzFiQziD2AIUzVbF9JT19JyslsFDjNRDau7Pd7YZygvzxYL',
      'Access-Control-Allow-Origin': '*'
    }}).then((response) => {
      debugger
      commit('SET_PRODUCTS', response.data.data)
    }, (err) => {
      console.log(err)
    })
  },
  saveProducts: ({commit}, products) => {
    commit('SAVE_PRODUCTS', products)
  },
  updateProduct: ({commit}, product) => {
    return new Promise((resolve, reject) => {
      axios.put('/products/' + product.id + '/', product, {headers: {
        'Authorization': 'Bearer pirQdACQsW03yDzFiQziD2AIUzVbF9JT19JyslsFDjNRDau7Pd7YZygvzxYL'
      }}).then(
        (response) => {
          commit('UPDATE_PRODUCT', response.data.data)
          resolve()
        },
        (err) => {
          reject(err)
        })
    })
  },
  dropProduct: ({commit}, id) => {
    axios.delete('/products/' + id + '/', {headers: {
      'Authorization': 'Bearer pirQdACQsW03yDzFiQziD2AIUzVbF9JT19JyslsFDjNRDau7Pd7YZygvzxYL'
    }}).then((response) => {
      commit('DROP_PRODUCT', id)
    }, (err) => {
      console.log(err)
    })
  }
}

const getters = {
  products: (state) => {
    return state.products
  },
  product: (state) => (id) => {
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
