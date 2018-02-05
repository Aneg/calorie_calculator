import { dropOrUpdateObjectById, generateIdByObject, copyValue } from '@/helpers/helper';

const state = {
  baskets: [],
  next_id: 0
};

const mutations = {
  'SAVE_BASKETS' (state, baskets) {
    state.next_id = generateIdByObject(baskets, state.next_id)
    state.baskets = copyValue(baskets)
  },
  'DROP_BASKET' (state, id) {
    dropOrUpdateObjectById(state.baskets, id);
  },
  'UPDATE_BASKET' (state, payload) {
    dropOrUpdateObjectById(state.baskets, payload.id, payload.basket);
  }
};

const actions = {
  saveBaskets: ({commit}, payload) => {
    commit('SAVE_BASKETS', payload);
  },
  updateBasket: ({commit}, payload) => {
    commit('UPDATE_BASKET', payload);
  },
  dropBasket: ({commit}, payload) => {
    commit('DROP_BASKET', payload);
  }
};

const getters = {
  baskets: state => {
    return state.baskets;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
