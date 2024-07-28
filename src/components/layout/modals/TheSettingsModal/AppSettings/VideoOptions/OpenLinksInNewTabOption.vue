<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="openLinksInNewTabText"
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
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'OpenLinksInNewTabOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      videoStore,
      {
        isOpenVideoLinksInNewTab: 'isOpenLinksInNewTab'
      }
    ),
    openLinksInNewTabText () {
      return this.$t(
        'settings.options.app.video.openLinksInNewTab'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
