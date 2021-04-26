<template>
  <TheLocalObserver />
  <TheTitleObserver />

  <TheNavbarPanel />
  <ThePlayerPanel />
  <TheQueuePanel />

  <div class="pusher">
    <TheBackground />
    <TheDropdownContext />

    <TheContainer />

    <TheSearchModal />
    <TheLoaderDimmer />
  </div>
</template>

<script>
import TheLocalObserver from '@/layout/TheLocalObserver.vue'
import TheTitleObserver from '@/layout/TheTitleObserver.vue'
import TheNavbarPanel from '@/layout/TheNavbarPanel.vue'
import ThePlayerPanel from '@/layout/ThePlayerPanel.vue'
import TheQueuePanel from '@/layout/TheQueuePanel.vue'
import TheBackground from '@/layout/TheBackground.vue'
import TheDropdownContext from '@/layout/TheDropdownContext.vue'
import TheContainer from '@/layout/TheContainer.vue'
import TheSearchModal from '@/layout/TheSearchModal.vue'
import TheLoaderDimmer from '@/layout/TheLoaderDimmer.vue'

export default {
  name: 'App',
  components: {
    TheLocalObserver,
    TheTitleObserver,
    TheNavbarPanel,
    ThePlayerPanel,
    TheQueuePanel,
    TheBackground,
    TheDropdownContext,
    TheContainer,
    TheSearchModal,
    TheLoaderDimmer
  }
}
</script>

<style lang="sass">
@import './src/assets/styles/Global.sass'
@import './src/assets/styles/Main.sass'
@import './src/assets/styles/Semantic.sass'
@import './src/assets/styles/Sources.sass'
</style>
