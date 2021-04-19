<template>
  <div
    class="ui inverted page dimmer"
    ref="loader"
  >
    <div class="ui loader"></div>
  </div>
</template>

<script>
import { setLoaderDimmer } from '#/actions/layout'
import { mainLoaderOptions } from '#/data/plugins/semantic'

export default {
  name: 'TheLoaderDimmer',
  mounted () {
    setLoaderDimmer(
      this.$refs.loader,
      mainLoaderOptions()
    )
  }
}
</script>

<style lang="sass" scoped></style>
