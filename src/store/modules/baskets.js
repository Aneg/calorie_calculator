import { dropOrUpdateObjectById } from '@/helpers/helper'

import axios from 'axios'

axios.defaults.baseURL = 'http://organaizer-backend.local/api'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://organaizer-backend.local'

const state = {
  baskets: []
}

const mutations = {
  'ADD_BASKET' (state, basket) {
    state.baskets.unshift(basket)
  },
  'SET_BASKETS' (state, baskets) {
    state.baskets = baskets
  },
  'DROP_BASKET' (state, id) {
    dropOrUpdateObjectById(state.baskets, id)
  },
  'UPDATE_BASKET' (state, payload) {
    dropOrUpdateObjectById(state.baskets, payload.id, payload.basket)
  }
}

const actions = {
  addBasket: ({commit, getters}, id) => {
    return new Promise((resolve, reject) => {
      axios.post('/baskets/', id, {headers: {
        'Authorization': 'Bearer KOPxSTlopKbfJjpgjtj6dxcKyXzjSGCnXC4GfNHB3bi8f0RCqjrOJeuEBdHR'
      }}).then((response) => {
        commit('ADD_BASKET', response.data.data)
        resolve()
      }, (err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  setBaskets: ({commit, getters}, sync) => {
    axios.get('/baskets', {headers: {
      'Authorization': 'Bearer KOPxSTlopKbfJjpgjtj6dxcKyXzjSGCnXC4GfNHB3bi8f0RCqjrOJeuEBdHR'
      // 'Access-Control-Allow-Origin': '*'
    }}).then((response) => {
      commit('SET_BASKETS', response.data.data)
    }, (err) => {
      console.log(err)
    })
  },
  updateBasket: ({commit}, baskets) => {
    return new Promise((resolve, reject) => {
      axios.put('/baskets/' + baskets.id + '/', baskets, {headers: {
        'Authorization': 'Bearer KOPxSTlopKbfJjpgjtj6dxcKyXzjSGCnXC4GfNHB3bi8f0RCqjrOJeuEBdHR'
      }}).then(
        (response) => {
          commit('UPDATE_BASKET', response.data.data)
          resolve()
        },
        (err) => {
          console.log(err.response)
          reject(err)
        })
    })
  },
  dropBasket: ({commit}, id) => {
    axios.delete('/baskets/' + id + '/', {headers: {
      'Authorization': 'Bearer KOPxSTlopKbfJjpgjtj6dxcKyXzjSGCnXC4GfNHB3bi8f0RCqjrOJeuEBdHR'
    }}).then((response) => {
      commit('DROP_BASKET', id)
    }, (err) => {
      console.log(err)
    })
  }
}

const getters = {
  baskets: state => {
    return state.baskets
  },
  basket: (state) => (id) => {
    return state.baskets.find((el) => { return el.id === id })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
