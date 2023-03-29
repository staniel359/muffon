<template>
  <TheElectronStoreObserver />

  <TheStoreObserver />

  <RouterView />
</template>

<script>
import TheElectronStoreObserver
  from '@/components/layout/observers/TheElectronStoreObserver.vue'
import TheStoreObserver
  from '@/components/layout/observers/TheStoreObserver.vue'

export default {
  name: 'AboutPageLayout',
  components: {
    TheElectronStoreObserver,
    TheStoreObserver
  }
}
</script>

<style lang="sass" scoped></style>
