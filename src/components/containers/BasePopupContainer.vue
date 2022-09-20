<template>
  <div
    ref="popup"
    class="ui popup main-popup"
  >
    <slot />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  toggleClass
} from '@/helpers/actions/plugins/jquery'

export default {
  name: 'BasePopupContainer',
  computed: {
    ...mapState(
      'layout',
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
    async handleIsDarkModeChange (
      value
    ) {
      await this.$nextTick()

      toggleClass(
        this.$refs.popup,
        'inverted',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
