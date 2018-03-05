import { dropOrUpdateObjectById } from '@/helpers/helper'

import axios from 'axios'

axios.defaults.baseURL = 'http://organaizer-backend.local/api'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://organaizer-backend.local'
axios.defaults.headers.put['Access-Control-Allow-Origin'] = 'http://organaizer-backend.local'
const headers = {'Authorization': 'Bearer KOPxSTlopKbfJjpgjtj6dxcKyXzjSGCnXC4GfNHB3bi8f0RCqjrOJeuEBdHR'}

const state = {
  baskets: [],
  basketTemplate: {}
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
  'UPDATE_BASKET' (state, newBasket) {
    state.baskets = state.baskets.map((basket) => {
      return basket.id === newBasket.id ? newBasket : basket
    })
  },
  'SET_BASCET_TEMLPATE' (state, basket) {
    state.basketTemplate = basket
  }
}

const actions = {
  addBasket: ({commit, getters}, id) => {
    return new Promise((resolve, reject) => {
      axios.post('/baskets/', id, {headers: headers}).then((response) => {
        commit('ADD_BASKET', response.data.data)
        resolve()
      }, (err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  setBaskets: ({commit, getters}) => {
    return new Promise((resolve, reject) => {
      axios.get('/baskets', {headers: headers}).then((response) => {
        commit('SET_BASKETS', response.data.data)
        resolve()
      }, (err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  updateBasket: ({commit}, basket) => {
    return new Promise((resolve, reject) => {
      axios.put('/baskets/' + basket.id + '/', basket, {headers: headers}).then(
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
    axios.delete('/baskets/' + id + '/', {headers: headers}).then((response) => {
      commit('DROP_BASKET', id)
    }, (err) => {
      console.log(err)
    })
  },
  basketTLoad: ({commit, getters}, id) => {
    return new Promise((resolve, reject) => {
      if (id) {
        axios.get('/baskets/' + id + '/', {headers: headers}).then((response) => {
          // debugger
          commit('SET_BASCET_TEMLPATE', response.data.data)
          resolve(response.data.data)
        }, (err) => {
          console.log(err)
          reject(err)
        })
      } else {
        commit('SET_BASCET_TEMLPATE', {name: '', items: []})
        resolve({name: '', items: []})
      }
    })
  }
}

const getters = {
  baskets: state => {
    return state.baskets
  },
  basket: (state) => (id) => {
    return state.baskets.find((el) => { return el.id === id })
  },
  basketT: (state) => {
    return state.basketTemplate.name ? state.basketTemplate : null
  },
  basketTName: (state) => {
    return state.basketTemplate.name ? state.basketTemplate.name : null
  },
  basketTItems: (state) => {
    return state.basketTemplate.items ? state.basketTemplate.items : []
  },
  basketTItem: (state) => (hash) => {
    return state.basketTemplate.items.find((el) => el.hash === hash)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
