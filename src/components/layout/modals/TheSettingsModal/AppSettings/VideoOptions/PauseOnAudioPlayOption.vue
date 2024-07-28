<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="pauseOnAudioPlayText"
      />

      <BaseToggle
        store-key="video.isPauseOnAudioPlay"
        :is-checked="isPauseVideoOnAudioPlay"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import videoStore from '@/stores/video'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'PauseOnAudioPlayOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      videoStore,
      {
        isPauseVideoOnAudioPlay: 'isPauseOnAudioPlay'
      }
    ),
    pauseOnAudioPlayText () {
      return this.$t(
        'settings.options.app.video.pauseOnAudioPlay'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
