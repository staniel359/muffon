<template>
  <TheStoreObserver />

  <TheElectronStoreObserver />

  <TheMediaKeysObserver />

  <TheBackground />

  <TheView v-if="isRootPage" />
  <template v-else>
    <ThePlayerObserver />

    <TheNavbarPanel />

    <TheSidebarPanel />

    <TheQueuePanel />

    <ThePlayerPanel />

    <TheVisibleArea />

    <TheSearchModal />

    <div class="pusher">
      <TheLoaderDimmer />

      <TheView ref="view" />
    </div>
  </template>
</template>

<script>
import TheStoreObserver
  from '*/components/layout/observers/TheStoreObserver.vue'
import TheElectronStoreObserver
  from '*/components/layout/observers/TheElectronStoreObserver.vue'
import TheMediaKeysObserver
  from '*/components/layout/observers/TheMediaKeysObserver.vue'
import TheBackground from '*/components/layout/TheBackground.vue'
import TheView from '*/components/layout/TheView.vue'
import ThePlayerObserver
  from '*/components/layout/observers/ThePlayerObserver.vue'
import TheNavbarPanel from '*/components/layout/panels/TheNavbarPanel.vue'
import TheSidebarPanel from '*/components/layout/panels/TheSidebarPanel.vue'
import TheQueuePanel from '*/components/layout/panels/TheQueuePanel.vue'
import ThePlayerPanel from '*/components/layout/panels/ThePlayerPanel.vue'
import TheVisibleArea from '*/components/layout/TheVisibleArea.vue'
import TheSearchModal from '*/components/layout/modals/TheSearchModal.vue'
import TheLoaderDimmer from '*/components/layout/TheLoaderDimmer.vue'

export default {
  name: 'App',
  components: {
    TheStoreObserver,
    TheElectronStoreObserver,
    TheMediaKeysObserver,
    TheBackground,
    TheView,
    ThePlayerObserver,
    TheNavbarPanel,
    TheSidebarPanel,
    TheQueuePanel,
    ThePlayerPanel,
    TheVisibleArea,
    TheSearchModal,
    TheLoaderDimmer
  },
  provide () {
    return {
      refresh: this.refresh
    }
  },
  computed: {
    isRootPage () {
      return this.$route.path === '/'
    }
  },
  methods: {
    refresh () {
      this.$refs
        .view
        .refresh()
    }
  }
}
</script>

<style lang="sass"></style>
