<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="video.isOpenLinksInNewTab"
        :is-checked="isOpenVideoLinksInNewTab"
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
  name: 'OpenLinksInNewTabOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      videoStore,
      {
        isOpenVideoLinksInNewTab: 'isOpenLinksInNewTab'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.app.video.openLinksInNewTab'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
