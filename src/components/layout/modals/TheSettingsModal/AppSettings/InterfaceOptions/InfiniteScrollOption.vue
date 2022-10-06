<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="infiniteScrollText"
    />

    <BaseToggle
      store-key="layout.isWithInfiniteScroll"
      :is-checked="isWithInfiniteScroll"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'InfiniteScrollOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isWithInfiniteScroll'
      ]
    ),
    infiniteScrollText () {
      return this.$t(
        'settings.options.app.interface.infiniteScroll'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
