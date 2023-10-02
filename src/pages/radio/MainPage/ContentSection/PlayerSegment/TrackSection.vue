<template>
  <div>
    <BaseListContainer
      class="selection"
    >
      <TrackItem
        ref="track"
        :track-data="firstTrackData"
        :queue-tracks="tracksCollection"
        is-with-artist-image
        is-with-artist-name
        is-from-radio
        is-with-source-option
        is-with-playlist-option
        is-with-share-option
        is-with-queue-option
      />
    </BaseListContainer>
  </div>
</template>

<script>
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import TrackItem
  from '@/components/lists/tracks/BaseTracksSimpleList/TrackItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

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
        [
          this.trackData
        ]
      )
    }
  },
  mounted () {
    this.getAudio()
  },
  methods: {
    getAudio () {
      this.$refs
        .track
        .getAudio()
    }
  }
}
</script>

<style lang="sass" scoped></style>
