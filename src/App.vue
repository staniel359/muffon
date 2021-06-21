<template>
  <TheObservers />

  <TheView v-if="isRootPage"/>
  <template v-else>
    <TheBackground />

    <TheNavbarPanel />
    <TheQueuePanel />
    <ThePlayerPanel />

    <TheVisibleArea />

    <TheSearchModal />

    <div class="pusher">
      <TheLoaderDimmer />

      <TheView />
    </div>
  </template>
</template>

<script>
import TheView from '@/layout/TheView.vue'
import TheObservers from '@/layout/TheObservers.vue'
import TheNavbarPanel from '@/layout/TheNavbarPanel.vue'
import TheQueuePanel from '@/layout/TheQueuePanel.vue'
import ThePlayerPanel from '@/layout/ThePlayerPanel.vue'
import TheBackground from '@/layout/TheBackground.vue'
import TheVisibleArea from '@/layout/TheVisibleArea.vue'
import TheSearchModal from '@/layout/TheSearchModal.vue'
import TheLoaderDimmer from '@/layout/TheLoaderDimmer.vue'

export default {
  name: 'App',
  components: {
    TheView,
    TheObservers,
    TheNavbarPanel,
    TheQueuePanel,
    ThePlayerPanel,
    TheBackground,
    TheVisibleArea,
    TheSearchModal,
    TheLoaderDimmer
  },
  computed: {
    isRootPage () {
      return this.$route.path === '/'
    }
  }
}
</script>

<style lang="sass">
@import './src/assets/styles/Main.sass'
@import './src/assets/styles/Sources.sass'
</style>
