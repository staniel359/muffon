<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="autoplayText"
    />

    <BaseToggle
      store-key="queue.isAutoplay"
      :is-checked="isQueueAutoplay"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/BaseToggle.vue'

export default {
  name: 'AutoplayOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'queue',
      {
        isQueueAutoplay: 'isAutoplay'
      }
    ),
    autoplayText () {
      return this.$t(
        'settings.options.app.queue.autoplay'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
