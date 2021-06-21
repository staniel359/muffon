<template>
  <TheLocalObserver />
  <TheStoreObserver />
  <ThePlayerObserver />
  <TheKeysObserver />
  <TheMediaKeysObserver />
</template>

<script>
import TheLocalObserver from './TheObservers/TheLocalObserver.vue'
import TheStoreObserver from './TheObservers/TheStoreObserver.vue'
import ThePlayerObserver from './TheObservers/ThePlayerObserver.vue'
import TheKeysObserver from './TheObservers/TheKeysObserver.vue'
import TheMediaKeysObserver from './TheObservers/TheMediaKeysObserver.vue'

export default {
  name: 'TheObservers',
  components: {
    TheLocalObserver,
    TheStoreObserver,
    ThePlayerObserver,
    TheKeysObserver,
    TheMediaKeysObserver
  }
}
</script>

<style lang="sass" scoped></style>
