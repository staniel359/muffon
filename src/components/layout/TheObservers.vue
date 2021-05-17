<template>
  <TheLocalObserver />
  <ThePlayerObserver />
  <TheMediaKeysObserver />
</template>

<script>
import TheLocalObserver from '@/observers/TheLocalObserver.vue'
import ThePlayerObserver from '@/observers/ThePlayerObserver.vue'
import TheMediaKeysObserver from '@/observers/TheMediaKeysObserver.vue'

export default {
  name: 'TheObservers',
  components: {
    TheLocalObserver,
    ThePlayerObserver,
    TheMediaKeysObserver
  }
}
</script>

<style lang="sass" scoped></style>
