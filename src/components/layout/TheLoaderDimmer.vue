<template>
  <div
    ref="loader"
    class="ui page dimmer"
  >
    <div
      class="ui large loader"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  setLoaderDimmer
} from '@/helpers/actions/layout'
import {
  mainLoaderOptions
} from '@/helpers/data/plugins/semantic'

export default {
  name: 'TheLoaderDimmer',
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    loaderOptions () {
      return mainLoaderOptions()
    }
  },
  watch: {
    isDarkMode: 'handleIsDarkModeChange'
  },
  mounted () {
    this.initialize()
  },
  methods: {
    handleIsDarkModeChange () {
      this.initialize()
    },
    initialize () {
      setLoaderDimmer(
        this.$refs.loader,
        this.loaderOptions
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
