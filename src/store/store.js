import Vue from 'vue'
import Vuex from 'vuex'

import projects from './modules/products'
import baskets from './modules/baskets'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    projects,
    baskets
  }
})
