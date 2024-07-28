<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="pauseOnVideoPlayText"
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
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'PauseOnVideoPlayOption',
  components: {
    BaseHeader,
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
    pauseOnVideoPlayText () {
      return this.$t(
        'settings.options.app.player.pauseOnVideoPlay'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
