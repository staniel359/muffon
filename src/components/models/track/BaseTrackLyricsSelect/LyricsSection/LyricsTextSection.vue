<template>
  <div class="main-lyrics-container no-padding">
    <p
      class="lyrics"
      v-text="lyrics"
    />
  </div>

  <BaseMoreLinkButton
    :link="link"
  />
</template>

<script>
import BaseMoreLinkButton from '@/components/buttons/BaseMoreLinkButton.vue'
import {
  lyrics as formatTrackLyricsLink
} from '@/helpers/formatters/links/track'

export default {
  name: 'LyricsTextSection',
  components: {
    BaseMoreLinkButton
  },
  props: {
    lyrics: {
      type: String,
      required: true
    },
    trackId: {
      type: Number,
      required: true
    },
    trackData: {
      type: Object,
      required: true
    },
    source: {
      type: String,
      required: true
    }
  },
  computed: {
    link () {
      return formatTrackLyricsLink(
        {
          artistName: this.artistName,
          trackTitle: this.trackTitle,
          sourceParams: this.sourceParams
        }
      )
    },
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    },
    sourceParams () {
      return {
        source: this.source,
        trackId: this.trackId
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
