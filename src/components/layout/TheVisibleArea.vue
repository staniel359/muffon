<template>
  <div
    class="the-visible-area"
    ref="visible"
  ></div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TheVisibleArea',
  mounted () {
    this.setVisibleContext(
      this.$refs.visible
    )
  },
  methods: {
    ...mapActions('layout', [
      'setVisibleContext'
    ])
  }
}
</script>

<style lang="sass" scoped>
.the-visible-area
  @extend .w-100, .fixed
  height: calc(100vh - #{$navbarHeight} - #{$playerPanelHeight})
  top: $navbarHeight
</style>
