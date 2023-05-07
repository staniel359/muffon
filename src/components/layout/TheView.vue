<template>
  <div class="ui container main-container main-view">
    <RouterView
      v-slot="{
        Component
      }"
    >
      <KeepAlive
        v-if="isCachePages"
      >
        <Component
          :is="Component"
          ref="component"
          :key="key"
        />
      </KeepAlive>
      <Component
        :is="Component"
        v-else
        ref="component"
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
    fullPathDecoded () {
      return decodeURI(
        this.fullPath
      )
    },
    fullPath () {
      return this.$route.fullPath
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
      this.key =
        this.fullPathDecoded
    },
    refresh () {
      this.$refs
        .component
        .refresh()
    }
  }
}
</script>

<style lang="sass" scoped></style>
