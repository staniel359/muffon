<template>
  <TheLocalObserver />

  <TheTitleObserver />

  <TheNavbarPanel />

  <ThePlayerPanel />

  <TheQueuePanel />

  <div class="pusher">
    <div id="the-background"></div>

    <div
      class="ui container main-container"
      id="the-container"
    >
      <RouterView :key="$route.fullPath" />

      <TheSearchModal ref="search" />
    </div>

    <TheLoaderDimmer />
  </div>
</template>

<script>
import TheLocalObserver from '@/layout/TheLocalObserver.vue'
import TheTitleObserver from '@/layout/TheTitleObserver.vue'
import TheNavbarPanel from '@/layout/TheNavbarPanel.vue'
import TheSearchModal from '@/layout/TheSearchModal.vue'
import TheLoaderDimmer from '@/layout/TheLoaderDimmer.vue'
import ThePlayerPanel from '@/layout/ThePlayerPanel.vue'
import TheQueuePanel from '@/layout/TheQueuePanel.vue'

export default {
  name: 'App',
  components: {
    TheLocalObserver,
    TheTitleObserver,
    TheNavbarPanel,
    TheSearchModal,
    TheLoaderDimmer,
    ThePlayerPanel,
    TheQueuePanel
  }
}
</script>

<style lang="sass" scoped>
#the-background
  @extend .fixed, .w-100, .h-100
  background: $backgroundPath center/cover no-repeat
  z-index: -1

#the-container
  padding: #{$mainContainerTopPadding} 0 #{$mainContainerBottomPadding} 0
</style>

<style lang="sass">
@import './src/assets/styles/Global.sass'
@import './src/assets/styles/AudioSources.sass'
</style>
