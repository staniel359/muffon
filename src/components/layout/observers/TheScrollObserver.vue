<template>
  <div
    id="the-scroll-observer"
  />
</template>

<script>
import scrollMixin from '@/mixins/scrollMixin'

export default {
  name: 'TheScrollObserver',
  mixins: [
    scrollMixin
  ],
  data () {
    return {
      scrollable: window
    }
  }
}
</script>

<style lang="sass" scoped></style>
