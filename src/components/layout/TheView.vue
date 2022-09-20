<template>
  <div class="ui container main-container the-view">
    <RouterView
      v-slot="{
        Component
      }"
    >
      <KeepAlive>
        <Component
          :is="Component"
          :key="key"
        />
      </KeepAlive>
    </RouterView>
  </div>
</template>

<script>
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'TheView',
  data () {
    return {
      key: null
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: 'handleRouteChange'
    }
  },
  methods: {
    handleRouteChange (
      value
    ) {
      this.key = value.fullPath
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
