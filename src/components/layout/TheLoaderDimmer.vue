<template>
  <div
    ref="dimmer"
    class="ui page dimmer"
    :class="{
      inverted: !isDarkMode
    }"
  >
    <div
      class="ui large loader"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  setLoaderDimmer
} from '@/helpers/actions/layout'
import {
  loader as loaderDimmerOptions
} from '@/helpers/formatters/plugins/semantic/options/dimmer'

export default {
  name: 'TheLoaderDimmer',
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    )
  },
  mounted () {
    setLoaderDimmer(
      this.$refs.dimmer,
      loaderDimmerOptions()
    )
  }
}
</script>

<style lang="sass" scoped></style>
