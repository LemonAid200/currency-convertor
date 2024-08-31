// import { type InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

// define your typings for the store state
export interface State {
  mainCurrency: string
}

// define injection key
// export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    mainCurrency: 'RUB'
  },
  mutations: {
    updateMainCurrency(state, newValue) {
      state.mainCurrency = newValue;
    },
  },
  actions: {
    updateMainCurrency({ commit }, newValue:string ) {
      commit('increment', newValue);
    }
  },
  getters: {
    getMainCurrency(state) {
      return state.mainCurrency;
    },
  }
})