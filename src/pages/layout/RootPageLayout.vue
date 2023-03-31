<template>
  <TheElectronStoreObserver />

  <TheStoreObserver />

  <TheRootBackground />

  <TheView />
</template>

<script>
import TheElectronStoreObserver
  from '@/components/layout/observers/TheElectronStoreObserver.vue'
import TheStoreObserver
  from '@/components/layout/observers/TheStoreObserver.vue'
import TheRootBackground from '@/components/layout/TheRootBackground.vue'
import TheView from '@/components/layout/TheView.vue'

export default {
  name: 'RootPageLayout',
  components: {
    TheElectronStoreObserver,
    TheStoreObserver,
    TheRootBackground,
    TheView
  }
}
</script>

<style lang="sass" scoped></style>
