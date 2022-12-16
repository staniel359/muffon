<template>
  <BaseToggle
    store-key="layout.isDarkMode"
    :class="{
      disabled: isWithSystemTheme
    }"
    :is-checked="isDarkMode"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'BaseDarkModeToggle',
  components: {
    BaseToggle
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode',
        'isWithSystemTheme'
      ]
    )
  }
}
</script>

<style lang="sass" scoped></style>
