<script lang="ts">
import { reactive, ref, watch, computed } from 'vue';
import { useStore } from 'vuex';

interface currencyToDisplay {
  from: string,
  to: string,
  value: string
}


export default {
    components: {
    },

    setup() {
        const store = useStore()
        let mainCurrency = computed(() => store.getters.getMainCurrency);
        let currenciesList = computed(() => store.getters.getCurrencyList);
        let currenciesValues = computed(() => store.getters.getCurrencyValuesList);


        const getCurrenciesToDisplay = (mainCurrency: string, currenciesList: string[], currenciesValues: Object): currencyToDisplay[] => {
          const isValidCurrencyPair = (key: string): key is keyof typeof currenciesValues =>  key in currenciesValues          
          return currenciesList.map((name):{key: keyof typeof currenciesValues, name: string} => 
            {return {name: name, key: `${name.toLowerCase()}-${mainCurrency.toLowerCase()}` as keyof typeof currenciesValues}})
          .filter(elem => isValidCurrencyPair(elem.key)).map(elem => 
            { return {from: mainCurrency, to: elem.name, value: currenciesValues[elem.key].toString()}})
        }
        
        let currenciesToDisplay = computed(() => { return getCurrenciesToDisplay(mainCurrency.value, currenciesList.value, currenciesValues.value)})

        store.dispatch('updateCurrencyValuesList')


        return {
          mainCurrency,
          currenciesValues,
          currenciesList,
          currenciesToDisplay
        };
    }
};
</script>

<template>
  <main>
    <ul>
      <li v-for="(currancyPair, index) in currenciesToDisplay" :key="index">1 {{ currancyPair.to }} = {{ currancyPair.value + ' ' + currancyPair.from }}</li>
    </ul>
  </main>
</template>

<style scoped lang="scss">
main {
  ul {
    list-style: none;
    margin-left: 0;
    padding-left: 0;
  }
}


</style>
