<template>
  <div
    class="item"
    :class="{
      disabled: isLoading
    }"
    @click="handleClick"
  >
    <BaseIcon
      :class="{
        red: isRed || isError
      }"
      :icon="icon"
      :is-loading="isLoading"
      :is-error="isError"
    />

    <span
      v-text="text"
    />

    <BaseIcon
      v-if="options"
      class="dropdown-icon"
      icon="dropdown"
    />

    <OptionsMenu
      v-if="options"
      :options="options"
    />
  </div>
</template>

<script>
import {
  defineAsyncComponent
} from 'vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'

const OptionsMenu =
  defineAsyncComponent(
    () => import(
      './BaseOption/OptionsMenu.vue'
    )
  )

export default {
  name: 'BaseOption',
  components: {
    BaseIcon,
    OptionsMenu
  },
  props: {
    text: {
      type: String,
      required: true
    },
    icon: String,
    isLoading: Boolean,
    isError: Boolean,
    options: Array,
    isRed: Boolean
  },
  emits: [
    'click'
  ],
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.dropdown-icon
  margin-right: 1em !important
</style>
