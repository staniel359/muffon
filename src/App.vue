<template>
  <TheStoreObserver />

  <TheLocalObserver />

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
import TheStoreObserver from '@/layout/observers/TheStoreObserver.vue'
import TheLocalObserver from '@/layout/observers/TheLocalObserver.vue'
import TheMediaKeysObserver from '@/layout/observers/TheMediaKeysObserver.vue'
import TheBackground from '@/layout/TheBackground.vue'
import TheView from '@/layout/TheView.vue'
import ThePlayerObserver from '@/layout/observers/ThePlayerObserver.vue'
import TheNavbarPanel from '@/layout/panels/TheNavbarPanel.vue'
import TheSidebarPanel from '@/layout/panels/TheSidebarPanel.vue'
import TheQueuePanel from '@/layout/panels/TheQueuePanel.vue'
import ThePlayerPanel from '@/layout/panels/ThePlayerPanel.vue'
import TheVisibleArea from '@/layout/TheVisibleArea.vue'
import TheSearchModal from '@/layout/modals/TheSearchModal.vue'
import TheLoaderDimmer from '@/layout/TheLoaderDimmer.vue'

export default {
  name: 'App',
  components: {
    TheStoreObserver,
    TheLocalObserver,
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
      this.$refs.view.refresh()
    }
  }
}
</script>

<style lang="sass"></style>
