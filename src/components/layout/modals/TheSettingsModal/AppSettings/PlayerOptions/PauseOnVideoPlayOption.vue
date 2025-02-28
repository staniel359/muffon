<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="player.isPauseOnVideoPlay"
        :is-checked="isPauseAudioOnVideoPlay"
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
  name: 'PauseOnVideoPlayOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      playerStore,
      {
        isPauseAudioOnVideoPlay:
          'isPauseOnVideoPlay'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.app.player.pauseOnVideoPlay'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
