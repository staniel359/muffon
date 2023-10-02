<template>
  <div class="main-settings-option-container">
    <div class="main-settings-option">
      <BaseHeader
        class="option-header"
        tag="h4"
        :text="annotationsText"
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
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'AnnotationsOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      lyricsStore,
      {
        isLyricsWithAnnotations: 'isWithAnnotations'
      }
    ),
    annotationsText () {
      return this.$t(
        'settings.options.app.lyrics.annotations'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
