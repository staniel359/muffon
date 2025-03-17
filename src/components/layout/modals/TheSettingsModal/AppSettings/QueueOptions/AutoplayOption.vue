<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
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
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'AutoplayOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      queueStore,
      {
        isQueueAutoplay: 'isAutoplay'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.app.queue.autoplay'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
