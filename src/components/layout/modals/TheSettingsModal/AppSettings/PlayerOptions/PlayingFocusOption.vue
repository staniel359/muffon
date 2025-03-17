<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="player.isWithPlayingFocus"
        :is-checked="isPlayerWithPlayingFocus"
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
  name: 'PlayingFocusOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      playerStore,
      {
        isPlayerWithPlayingFocus:
          'isWithPlayingFocus'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.app.player.focusPlaying'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
