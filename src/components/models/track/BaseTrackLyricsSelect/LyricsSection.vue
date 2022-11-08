<template>
  <BaseTrackLyricsContainer
    class="lyrics-data-segment"
    :selected-track-data="selectedTrackData"
    @focus="handleFocus"
  >
    <template #default="slotProps">
      <LyricsTextSection
        :lyrics="slotProps.lyrics"
        :track-id="slotProps.trackId"
      />
    </template>
  </BaseTrackLyricsContainer>
</template>

<script>
import BaseTrackLyricsContainer
  from '@/components/containers/track/BaseTrackLyricsContainer.vue'
import LyricsTextSection from './LyricsSection/LyricsTextSection.vue'

export default {
  name: 'LyricsSection',
  components: {
    BaseTrackLyricsContainer,
    LyricsTextSection
  },
  props: {
    selectedTrackData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'focus'
  ],
  methods: {
    handleFocus () {
      this.$emit(
        'focus'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.lyrics-data-segment
  @extend .no-padding
</style>
