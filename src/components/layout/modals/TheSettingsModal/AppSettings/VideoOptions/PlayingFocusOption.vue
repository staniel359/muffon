<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="video.isWithPlayingFocus"
        :is-checked="isVideoWithPlayingFocus"
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
  name: 'PlayingFocusOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      videoStore,
      {
        isVideoWithPlayingFocus: 'isWithPlayingFocus'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.app.video.focusPlaying'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
