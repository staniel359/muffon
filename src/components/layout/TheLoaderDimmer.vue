<template>
  <div
    class="ui page dimmer"
    :class="{ inverted: !isDarkMode }"
    ref="loader"
  >
    <div class="ui loader"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setLoaderDimmer } from '#/actions/layout'
import { mainLoaderOptions } from '#/data/plugins/semantic'

export default {
  name: 'TheLoaderDimmer',
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  },
  mounted () {
    setLoaderDimmer(
      this.$refs.loader,
      mainLoaderOptions()
    )
  }
}
</script>

<style lang="sass" scoped></style>
