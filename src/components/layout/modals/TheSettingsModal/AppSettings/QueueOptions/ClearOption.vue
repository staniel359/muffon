<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
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
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'ClearOption',
  components: {
    BaseSettingsOptionHeader,
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
    optionText () {
      return this.$t(
        'settings.options.app.queue.clear'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
