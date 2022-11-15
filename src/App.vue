<template>
  <TheElectronStoreObserver />

  <TheStoreObserver />

  <RouterView
    v-if="isAboutPage"
  />
  <template
    v-else
  >
    <ThePlayerObserver />

    <TheBackground />

    <TheView
      v-if="isRootPage"
    />
    <template
      v-else
    >
      <TheNavbarPanel />

      <TheSidebarPanel />

      <TheQueuePanel />

      <ThePlayerVariantsPanel />

      <TheVisibleArea />

      <TheSearchModal />

      <TheScrollToTopButton />

      <TheDonateModal />

      <div class="pusher">
        <TheLoaderDimmer />

        <TheView
          ref="view"
        />
      </div>
    </template>
  </template>
</template>

<script>
import TheElectronStoreObserver
  from '@/components/layout/observers/TheElectronStoreObserver.vue'
import TheStoreObserver
  from '@/components/layout/observers/TheStoreObserver.vue'
import ThePlayerObserver
  from '@/components/layout/observers/ThePlayerObserver.vue'
import TheBackground from '@/components/layout/TheBackground.vue'
import TheView from '@/components/layout/TheView.vue'
import TheNavbarPanel from '@/components/layout/panels/TheNavbarPanel.vue'
import TheSidebarPanel from '@/components/layout/panels/TheSidebarPanel.vue'
import TheQueuePanel from '@/components/layout/panels/TheQueuePanel.vue'
import ThePlayerVariantsPanel
  from '@/components/layout/panels/ThePlayerVariantsPanel.vue'
import TheVisibleArea from '@/components/layout/TheVisibleArea.vue'
import TheSearchModal from '@/components/layout/modals/TheSearchModal.vue'
import TheScrollToTopButton from '@/components/layout/TheScrollToTopButton.vue'
import TheDonateModal from '@/components/layout/modals/TheDonateModal.vue'
import TheLoaderDimmer from '@/components/layout/TheLoaderDimmer.vue'

export default {
  name: 'App',
  components: {
    TheElectronStoreObserver,
    TheStoreObserver,
    ThePlayerObserver,
    TheBackground,
    TheView,
    TheNavbarPanel,
    TheSidebarPanel,
    TheQueuePanel,
    ThePlayerVariantsPanel,
    TheVisibleArea,
    TheSearchModal,
    TheScrollToTopButton,
    TheDonateModal,
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
    },
    isAboutPage () {
      return this.$route.path === '/about'
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
