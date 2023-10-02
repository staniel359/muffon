<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="clearText"
      />

      <BaseToggle
        store-key="queue.isClearOnPlayerClose"
        :is-checked="isClearQueueOnPlayerClose"
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
  name: 'ClearOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      queueStore,
      {
        isClearQueueOnPlayerClose:
          'isClearOnPlayerClose'
      }
    ),
    clearText () {
      return this.$t(
        'settings.options.app.queue.clear'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
