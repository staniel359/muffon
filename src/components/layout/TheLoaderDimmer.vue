<template>
  <div
    ref="loader"
    class="ui page dimmer"
  >
    <div class="ui loader" />
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
import {
  toggleClass
} from '@/helpers/actions/plugins/jquery'

export default {
  name: 'TheLoaderDimmer',
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
  mounted () {
    setLoaderDimmer(
      this.$refs.loader,
      mainLoaderOptions()
    )
  },
  methods: {
    async handleIsDarkModeChange (
      value
    ) {
      await this.$nextTick()

      toggleClass(
        this.$refs.loader,
        'inverted',
        !value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
