<template>
  <div
    class="ui popup main-popup"
    ref="popup"
  >
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { toggleClass } from '*/helpers/actions/plugins/jquery'

export default {
  name: 'BasePopupContainer',
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  },
  watch: {
    isDarkMode: {
      immediate: true,
      handler: 'handleIsDarkModeChange'
    }
  },
  methods: {
    handleIsDarkModeChange (value) {
      this.$nextTick(() => {
        toggleClass(
          this.$refs.popup,
          'inverted',
          value
        )
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
