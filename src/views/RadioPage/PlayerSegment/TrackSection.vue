<template>
  <BaseListContainer class="selection">
    <TrackItem
      ref="track"
      :trackData="firstTrackData"
      :queueTracks="tracksCollection"
      isWithArtistName
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '*/components/containers/lists/BaseListContainer.vue'
import TrackItem
  from '*/components/lists/tracks/BaseTracksSimpleList/TrackItem.vue'
import { collection as formatCollection } from '*/helpers/formatters'

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
    firstTrackData () {
      return this.tracksCollection[0]
    },
    tracksCollection () {
      return formatCollection(
        [this.trackData]
      )
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
