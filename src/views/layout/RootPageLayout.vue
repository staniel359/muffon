<template>
  <TheElectronStoreObserver />

  <TheStoreObserver />

  <ThePlayerObserver />

  <TheBackground />

  <TheView />
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

export default {
  name: 'RootPageLayout',
  components: {
    TheElectronStoreObserver,
    TheStoreObserver,
    ThePlayerObserver,
    TheBackground,
    TheView
  }
}
</script>

<style lang="sass" scoped></style>
