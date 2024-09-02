<script lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { RouterLink, RouterView } from 'vue-router'
import CustomDropdown from './components/CustomDropdown.vue';

export default {
  components: {
    CustomDropdown
  },
  setup() {
    const store = useStore();
    let mainCurrency = ref(store.getters.getMainCurrency)
    const currencyOptions = computed(() => store.getters.getCurrencyList)

    store.dispatch('updateCurrencyValuesList')

    const updateMainCurrency = () => {
      store.dispatch('updateMainCurrency', mainCurrency.value);
    };

    watch(() => mainCurrency.value, () => {
      updateMainCurrency()
    });


    return {
      mainCurrency,
      currencyOptions,
    };
  }
};

</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/convert">Конвертация</RouterLink>
      </nav>
      <CustomDropdown v-model="mainCurrency" :optionsList="currencyOptions"/>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
}

.logo {
  margin: 0 2rem 0 0;
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}

nav {
  width: 100%;
  font-size: 1rem; /* Изменено на 1rem из-за последнего определения */
  text-align: left; /* Изменено на left из-за последнего определения */
  margin-left: -1rem;
  padding: 1rem 0; /* Объединено с текстовым выравниванием */
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
