<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
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
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'PauseOnAudioPlayOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      videoStore,
      {
        isPauseVideoOnAudioPlay: 'isPauseOnAudioPlay'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.app.video.pauseOnAudioPlay'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
