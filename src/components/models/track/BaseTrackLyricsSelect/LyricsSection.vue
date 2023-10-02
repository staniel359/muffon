<template>
  <BaseTrackLyricsContainer
    :selected-track-data="selectedTrackData"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <LyricsTextSection
        :lyrics="slotProps.lyrics"
        :track-id="slotProps.trackId"
        :source="slotProps.source"
        :track-data="trackData"
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
    selectedTrackData: Object,
    trackData: Object
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

<style lang="sass" scoped></style>
