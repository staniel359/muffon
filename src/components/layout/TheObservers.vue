<template>
  <TheLocalObserver />
  <TheTitleObserver />
  <TheMediaKeysObserver />
</template>

<script>
import TheLocalObserver from '@/observers/TheLocalObserver.vue'
import TheTitleObserver from '@/observers/TheTitleObserver.vue'
import TheMediaKeysObserver from '@/observers/TheMediaKeysObserver.vue'

export default {
  name: 'TheObservers',
  components: {
    TheLocalObserver,
    TheTitleObserver,
    TheMediaKeysObserver,
  }
}
</script>

<style lang="sass" scoped></style>
