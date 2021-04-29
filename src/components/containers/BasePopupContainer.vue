<template>
  <div
    class="ui popup main-popup"
    ref="popup"
  >
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { toggleClass } from '#/actions/plugins/jquery'

export default {
  name: 'BasePopupContainer',
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  },
  watch: {
    isDarkMode: 'handleIsDarkModeChange'
  },
  methods: {
    handleIsDarkModeChange (value) {
      toggleClass(
        this.$refs.popup,
        'inverted',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.content
  @extend .h-100, .d-flex, .flex-column, .align-items-center
</style>
