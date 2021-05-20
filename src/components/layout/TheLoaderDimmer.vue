<template>
  <div
    class="ui page dimmer"
    ref="loader"
  >
    <div class="ui loader"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setLoaderDimmer } from '#/actions/layout'
import { mainLoaderOptions } from '#/data/plugins/semantic'
import { toggleClass } from '#/actions/plugins/jquery'

export default {
  name: 'TheLoaderDimmer',
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
  mounted () {
    setLoaderDimmer(
      this.$refs.loader,
      mainLoaderOptions()
    )
  },
  methods: {
    handleIsDarkModeChange (value) {
      this.$nextTick(() => {
        toggleClass(
          this.$refs.loader,
          'inverted',
          !value
        )
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
