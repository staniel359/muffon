<template>
  <TheObservers />

  <TheNavbarPanel />
  <ThePlayerPanel />
  <TheQueuePanel />

  <div class="pusher">
    <TheBackground />
    <TheVisibleContext />

    <TheContainer />

    <TheLoaderDimmer />
    <TheSearchModal />
  </div>
</template>

<script>
import TheObservers from '@/layout/TheObservers.vue'
import TheNavbarPanel from '@/layout/TheNavbarPanel.vue'
import ThePlayerPanel from '@/layout/ThePlayerPanel.vue'
import TheQueuePanel from '@/layout/TheQueuePanel.vue'
import TheBackground from '@/layout/TheBackground.vue'
import TheVisibleContext from '@/layout/TheVisibleContext.vue'
import TheContainer from '@/layout/TheContainer.vue'
import TheSearchModal from '@/layout/TheSearchModal.vue'
import TheLoaderDimmer from '@/layout/TheLoaderDimmer.vue'

export default {
  name: 'App',
  components: {
    TheObservers,
    TheNavbarPanel,
    ThePlayerPanel,
    TheQueuePanel,
    TheBackground,
    TheVisibleContext,
    TheContainer,
    TheSearchModal,
    TheLoaderDimmer
  }
}
</script>

<style lang="sass">
@import './src/assets/styles/Main.sass'
@import './src/assets/styles/Sources.sass'
</style>
