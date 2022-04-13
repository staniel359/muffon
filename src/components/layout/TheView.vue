<template>
  <div class="ui container main-container the-view">
    <RouterView :key="key" />
  </div>
</template>

<script>
import {
  generateKey
} from '*/helpers/utils'

export default {
  name: 'TheView',
  data () {
    return {
      key: null
    }
  },
  watch: {
    $route: 'handleRouteChange'
  },
  methods: {
    handleRouteChange () {
      this.refresh()
    },
    refresh () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped>
.the-view
  padding-top: $mainContainerTopPadding
  padding-bottom: $mainContainerBottomPadding
</style>
