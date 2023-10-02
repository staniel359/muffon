<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
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
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import queueStore from '@/stores/queue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'AutoplayOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      queueStore,
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
