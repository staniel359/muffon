<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseSettingsOptionHeader
        :text="optionText"
      />

      <BaseToggle
        store-key="lyrics.isWithAnnotations"
        :is-checked="isLyricsWithAnnotations"
      />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import lyricsStore from '@/stores/lyrics'
import BaseSettingsOptionHeader
  from '@/components/headers/settings/BaseSettingsOptionHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'AnnotationsOption',
  components: {
    BaseSettingsOptionHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      lyricsStore,
      {
        isLyricsWithAnnotations: 'isWithAnnotations'
      }
    ),
    optionText () {
      return this.$t(
        'settings.options.app.lyrics.annotations'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
