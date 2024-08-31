<script lang="ts">
import { reactive, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { RouterLink, RouterView } from 'vue-router'
import CustomDropdown from './components/CustomDropdown.vue';

export default {
  components: {
    CustomDropdown
  },
  setup() {
    const mainCurrency = ref('RUB');
    const currencyOptions = reactive(['EUR', 'RUB', 'USD'])
    const store = useStore();


    const count = computed(() => store.getters.getCount);

    const increment = () => {
      store.dispatch('increment');
    };

    const decrement = () => {
      store.dispatch('decrement');
    };

    return {
      mainCurrency,
      currencyOptions,
      count,
      increment,
      decrement
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

  <h1 @click="increment">asdasd: {{ count }}</h1>
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
