<script lang="ts">
import { reactive, ref, watch } from 'vue';
// import IconDropdown from './icons/IconDropdown.vue';

export default {
    components: {
        // IconDropdown
    },

    props: {
      modelValue: {
        type: String,
        default: () => 'RUB',
        required: false
      },
    },

    setup(props, { emit }) {
        const localValue = ref(props.modelValue);
        // let isOptionsOpen = ref(false)

        // const toggleOptions = () => {isOptionsOpen.value = !isOptionsOpen.value}


        watch(() => props.modelValue, (newValue) => {
            localValue.value = newValue;
        });

        // const updateValue = (newValue:string) => {
        //     localValue.value = newValue
        //     toggleOptions()
        //     emit('update:modelValue', localValue.value);
        // };

        return {
          localValue
        };
    }
};


</script>

<template>
  <main>
    Главная
    {{ localValue }}
  </main>
</template>

<style scoped lang="scss">



</style>
