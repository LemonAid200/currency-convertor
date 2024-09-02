// import { type InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import axios from 'axios'

// define your typings for the store state
export interface State {
  mainCurrency: string,
  currencyList: Array<string>,
  currencyValuesList: object
}


export const store = createStore<State>({
  state: {
    mainCurrency: 'RUB',
    currencyList: ['EUR', 'RUB', 'USD'],
    currencyValuesList: {}
  },
  mutations: {
    updateMainCurrency(state, newValue) {
      state.mainCurrency = newValue;
    },
    updateCurrencyValuesList(state, newValue){
      state.currencyValuesList = newValue
    }
  },
  actions: {
    updateMainCurrency({ commit }, newValue:string ) {
      commit('updateMainCurrency', newValue);
    },
    async updateCurrencyValuesList({commit}){
      const response = await axios.get('https://status.neuralgeneration.com/api/currency')
      commit('updateCurrencyValuesList', response.data)        
    },
  },
  getters: {
    getMainCurrency(state):string {
      return state.mainCurrency;
    },
    getCurrencyValuesList(state):Object{
      return state.currencyValuesList
    },
    getCurrencyList(state):Array<string>{
      return state.currencyList
    }
  }
})