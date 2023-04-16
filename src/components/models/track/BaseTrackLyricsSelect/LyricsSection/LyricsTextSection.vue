<template>
  <div class="main-lyrics-container">
    <p
      class="lyrics"
      v-text="lyrics"
    />

    <BaseMoreLinkButton
      :link="link"
    />
  </div>
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
        source: 'genius',
        trackId: this.trackId
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
