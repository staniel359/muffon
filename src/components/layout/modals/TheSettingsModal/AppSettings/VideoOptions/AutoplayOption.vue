<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="autoplayText"
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
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'AutoplayOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      videoStore,
      {
        isVideoAutoplay: 'isAutoplay'
      }
    ),
    autoplayText () {
      return this.$t(
        'settings.options.app.video.autoplay'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
