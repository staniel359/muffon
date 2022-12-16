<template>
  <div class="ui container main-container the-view">
    <RouterView
      v-slot="{
        Component
      }"
    >
      <KeepAlive
        v-if="isKeepAlive"
      >
        <Component
          :is="Component"
          :key="key"
        />
      </KeepAlive>
      <Component
        :is="Component"
        v-else
        :key="key"
      />
    </RouterView>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
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
  computed: {
    ...mapState(
      layoutStore,
      [
        'isCachePages'
      ]
    ),
    isKeepAlive () {
      return (
        !this.isBasePage &&
          this.isCachePages
      )
    },
    isBasePage () {
      return (
        this.isRootPage ||
          this.isAboutPage
      )
    },
    isRootPage () {
      return this.$route.path === '/'
    },
    isAboutPage () {
      return this.$route.path === '/about'
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
