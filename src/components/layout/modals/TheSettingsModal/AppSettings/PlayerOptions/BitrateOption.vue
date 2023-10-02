<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="bitrateText"
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
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'BitrateOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      playerStore,
      {
        isPlayerWithBitrate: 'isWithBitrate'
      }
    ),
    bitrateText () {
      return this.$t(
        'settings.options.app.player.bitrate'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
