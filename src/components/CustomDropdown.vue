<script lang="ts">
import { ref, watch } from 'vue';
import IconDropdown from './icons/IconDropdown.vue';

export default {
    components: {
        IconDropdown
    },

    props: {
        modelValue: {
            type: String,
            required: false
        },
        optionsList: {
            type: Array as () => string[],
            required: true
        }
    },

    setup(props, { emit }) {
        const localValue = ref(props.modelValue);
        let isOptionsHidden = ref(true)

        const toggleOptions = () => {isOptionsHidden.value = !isOptionsHidden.value}


        watch(() => props.modelValue, (newValue) => {
            localValue.value = newValue;
        });

        const updateValue = (newValue:string) => {
            localValue.value = newValue
            toggleOptions()
            emit('update:modelValue', localValue.value);
        };

        return {
            localValue,
            isOptionsHidden,
            toggleOptions,
            updateValue
        };
    }
};


</script>

<template>
  <div class="dropdown">
    <div class="dropdown__main" @click="toggleOptions">
        <span>{{ localValue }}</span>
        <IconDropdown/>
    </div>

    <ul class="dropdown__options_list" :class="{'dropdown__options_list--closed': isOptionsHidden}">
        <li class="dropdown__options_list__option" v-for="(option, index) in optionsList"
            @click="updateValue(option)" :key="index">
            {{ option }}
        </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.dropdown {
    position: relative;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 4px;
    display: flex;
    min-width: 100px;
    max-width: 200px;
    user-select: none;
    
    &:hover {
        cursor: pointer;
    }

    &__main {
        width: 100%;
        display: flex;
        // gap: 10px;
        justify-content: space-between;
    }
    &__options_list {
        position: absolute;
        padding-left: 0;
        list-style-type: none;
        top: 100%;
        overflow: hidden;
        transition: all 500ms;
        max-height: 500px;


        &__option {
            cursor: pointer;

        }
    }
    &__options_list--closed {
        max-height: 0;
    }

}


</style>
