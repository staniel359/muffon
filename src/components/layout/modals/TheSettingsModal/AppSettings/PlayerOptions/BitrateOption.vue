<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="player.isWithBitrate"
        :is-checked="isPlayerWithBitrate"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'BitrateOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      playerStore,
      {
        isPlayerWithBitrate: 'isWithBitrate'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.app.player.bitrate'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
