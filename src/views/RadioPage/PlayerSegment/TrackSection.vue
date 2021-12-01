<template>
  <BaseListContainer class="selection">
    <TrackItem
      ref="track"
      :trackData="trackDataFormatted"
      :queueTracks="tracksFormatted"
      isWithArtistName
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer from '@/containers/BaseListContainer.vue'
import TrackItem from '@/lists/tracks/BaseTracksSimpleList/TrackItem.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'TrackSection',
  components: {
    BaseListContainer,
    TrackItem
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  computed: {
    tracksFormatted () {
      return formatCollection(
        this.tracks
      )
    },
    tracks () {
      return [this.trackData]
    },
    trackDataFormatted () {
      return this.tracksFormatted[0]
    }
  },
  methods: {
    fetchAudio () {
      this.$refs.track.fetchAudio()
    }
  }
}
</script>

<style lang="sass" scoped></style>
