<template>
  <TheElectronStoreObserver />

  <TheStoreObserver />

  <TheBackground />

  <TheView
    v-if="isRootPage"
  />
  <template v-else>
    <TheNavbarPanel />

    <TheSidebarPanel />

    <TheQueuePanel />

    <ThePlayerPanel />

    <TheVisibleArea />

    <TheSearchModal />

    <div class="pusher">
      <TheLoaderDimmer />

      <TheView
        ref="view"
      />
    </div>
  </template>
</template>

<script>
import TheElectronStoreObserver
  from '*/components/layout/observers/TheElectronStoreObserver.vue'
import TheStoreObserver
  from '*/components/layout/observers/TheStoreObserver.vue'
import TheBackground from '*/components/layout/TheBackground.vue'
import TheView from '*/components/layout/TheView.vue'
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
    TheElectronStoreObserver,
    TheStoreObserver,
    TheBackground,
    TheView,
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
      refreshPage: this.refreshPage
    }
  },
  computed: {
    isRootPage () {
      return this.$route.path === '/'
    }
  },
  methods: {
    refreshPage () {
      this.$refs
        .view
        .refresh()
    }
  }
}
</script>

<style lang="sass"></style>
