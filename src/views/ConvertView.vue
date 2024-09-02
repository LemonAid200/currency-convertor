<script lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import CustomDropdown from '../components/CustomDropdown.vue';

export default {
  components: {
    CustomDropdown
  },
  setup() {
    const store = useStore();
    const currencyList = computed(() => store.getters.getCurrencyList)
    const currencyValuesList = computed(() => store.getters.getCurrencyValuesList)
    const currenciesToDisplay = reactive([{name: 'RUB', value: 0}, {name: 'EUR', value: 0}])

    const getCurrensiesRatio = (from:string, to:string):number => {
      const key = `${from}-${to}`.toLowerCase() as keyof typeof currencyValuesList.value
      console.log(`${from}-${to}`.toLowerCase(), (key in currencyValuesList.value), currencyValuesList.value  )
      if (key in currencyValuesList.value){
        return currencyValuesList.value[key]       
      } else {
        return 1
      }
    }
    const updateValues = (currency:{name:string, value:number}) => {
      const updateValuesWithIndex = (index:number) => {
        let from: string = currency.name
        let to:string = currenciesToDisplay[index].name
        currenciesToDisplay[index].value = Number((currency.value * getCurrensiesRatio(from, to)).toFixed(2))
      }

      if (currency === currenciesToDisplay[0]){
        updateValuesWithIndex(1)
      } else {
        updateValuesWithIndex(0)
      }

    }

    watch(currencyValuesList, () => {
      updateValues(currenciesToDisplay[0])
    })

    return {
      currencyList,
      currenciesToDisplay,
      updateValues
    };
  }
};

</script>
<template>
  <div class="convert">
    <form class="convert__form" >
      <table>
        <tr v-for="(currency, index) in currenciesToDisplay" :key="index" @input="updateValues(currency)">
          <th><input type="number" v-model="currency.value" /></th>
          <th><CustomDropdown v-model="currency.name" :optionsList="currencyList" @update:modelValue="updateValues(currency)"/></th>
        </tr>
      </table>
      
    </form>
  </div> 
</template>

<style>
.convert {
  input {
    border: 1px solid grey;
    border-radius: 5px;
    padding: 4px;
    display: flex;
    min-width: 100px;
    max-width: 200px;
    user-select: none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }


  }
}
</style>
