<template>
  <BaseToggle
    store-key="layout.isDarkMode"
    :is-checked="isDarkMode"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseToggle from '*/components/BaseToggle.vue'

export default {
  name: 'BaseDarkModeToggle',
  components: {
    BaseToggle
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    )
  }
}
</script>

<style lang="sass" scoped></style>
