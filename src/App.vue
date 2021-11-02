<template>
  <TheStoreObserver />
  <TheLocalObserver />
  <TheKeysObserver />
  <TheMediaKeysObserver />

  <TheBackground />

  <TheView v-if="isRootPage"/>
  <template v-else>
    <ThePanels />

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
import TheKeysObserver from '@/layout/observers/TheKeysObserver.vue'
import TheMediaKeysObserver from '@/layout/observers/TheMediaKeysObserver.vue'
import TheView from '@/layout/TheView.vue'
import ThePanels from '@/layout/ThePanels.vue'
import TheBackground from '@/layout/TheBackground.vue'
import TheVisibleArea from '@/layout/TheVisibleArea.vue'
import TheSearchModal from '@/layout/TheSearchModal.vue'
import TheLoaderDimmer from '@/layout/TheLoaderDimmer.vue'

export default {
  name: 'App',
  components: {
    TheStoreObserver,
    TheLocalObserver,
    TheKeysObserver,
    TheMediaKeysObserver,
    TheView,
    ThePanels,
    TheBackground,
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
