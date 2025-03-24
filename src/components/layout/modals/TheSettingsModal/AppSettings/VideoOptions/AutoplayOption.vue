<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="video.isAutoplay"
        :is-checked="isVideoAutoplay"
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
  name: 'AutoplayOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      videoStore,
      {
        isVideoAutoplay: 'isAutoplay'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.app.video.autoplay'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
