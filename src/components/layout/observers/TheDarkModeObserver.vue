<template>
  <div
    id="the-dark-mode-observer"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  toggleClass
} from '@/helpers/actions/plugins/jquery'

export default {
  name: 'TheDarkModeObserver',
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    )
  },
  watch: {
    isDarkMode: {
      immediate: true,
      handler: 'handleIsDarkModeChange'
    }
  },
  methods: {
    handleIsDarkModeChange (
      value
    ) {
      toggleClass(
        'body',
        'inverted',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
