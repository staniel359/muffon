<template>
  <div class="track-main-info">
    <TrackTitle
      :trackTitle="trackTitle"
      :trackExtraTitle="trackExtraTitle"
      :artistName="artistName"
      @linkClick="handleLinkClick"
    />

    <TrackArtistName
      v-if="isRenderArtistName"
      :artists="artists"
      :artistName="artistName"
      @linkClick="handleLinkClick"
    />

    <TrackAlbumTitle
      v-if="isRenderAlbumTitle"
      :albumTitle="albumTitle"
      :artistName="artistName"
      @linkClick="handleLinkClick"
    />
  </div>
</template>

<script>
import TrackTitle from './TrackMainInfo/TrackTitle.vue'
import TrackArtistName from './TrackMainInfo/TrackArtistName.vue'
import TrackAlbumTitle from './TrackMainInfo/TrackAlbumTitle.vue'

export default {
  name: 'TrackMainInfo',
  components: {
    TrackTitle,
    TrackArtistName,
    TrackAlbumTitle
  },
  props: {
    trackTitle: String,
    trackExtraTitle: String,
    isWithArtistName: Boolean,
    artistName: String,
    artists: Array,
    albumArtistName: String,
    isWithAlbumTitle: Boolean,
    albumTitle: String
  },
  emits: [
    'linkClick'
  ],
  computed: {
    isRenderArtistName () {
      return (
        this.isWithArtistName && (
          !this.albumArtistName || (
            this.artistName.toLowerCase() !==
              this.albumArtistName.toLowerCase()
          )
        )
      )
    },
    isRenderAlbumTitle () {
      return (
        this.isWithAlbumTitle &&
          this.albumTitle
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped>
.track-main-info
  @extend .flex-full
</style>
