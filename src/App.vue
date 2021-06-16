<template>
  <TheObservers />

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

<script>
import TheObservers from '@/layout/TheObservers.vue'
import TheNavbarPanel from '@/layout/TheNavbarPanel.vue'
import TheQueuePanel from '@/layout/TheQueuePanel.vue'
import ThePlayerPanel from '@/layout/ThePlayerPanel.vue'
import TheBackground from '@/layout/TheBackground.vue'
import TheVisibleArea from '@/layout/TheVisibleArea.vue'
import TheView from '@/layout/TheView.vue'
import TheSearchModal from '@/layout/TheSearchModal.vue'
import TheLoaderDimmer from '@/layout/TheLoaderDimmer.vue'

export default {
  name: 'App',
  components: {
    TheObservers,
    TheNavbarPanel,
    TheQueuePanel,
    ThePlayerPanel,
    TheBackground,
    TheVisibleArea,
    TheView,
    TheSearchModal,
    TheLoaderDimmer
  }
}
</script>

<style lang="sass">
@import './src/assets/styles/Main.sass'
@import './src/assets/styles/Sources.sass'
</style>
