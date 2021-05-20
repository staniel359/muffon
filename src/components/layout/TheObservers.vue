<template>
  <TheLocalObserver />
  <TheStoreObserver />
  <ThePlayerObserver />
  <TheMediaKeysObserver />
</template>

<script>
import TheLocalObserver from '@/observers/TheLocalObserver.vue'
import TheStoreObserver from '@/observers/TheStoreObserver.vue'
import ThePlayerObserver from '@/observers/ThePlayerObserver.vue'
import TheMediaKeysObserver from '@/observers/TheMediaKeysObserver.vue'

export default {
  name: 'TheObservers',
  components: {
    TheLocalObserver,
    TheStoreObserver,
    ThePlayerObserver,
    TheMediaKeysObserver
  }
}
</script>

<style lang="sass" scoped></style>
