<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="playingFocusText"
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
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'PlayingFocusOption',
  components: {
    BaseHeader,
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
    playingFocusText () {
      return this.$t(
        'settings.options.app.player.focusPlaying'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
