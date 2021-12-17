<template>
  <div class="track-main-info">
    <TrackTitle
      :trackData="trackData"
      :artistName="artistName"
      :isLinkToLibrary="isLinkToLibrary"
      :profileId="profileId"
      :trackId="trackId"
      @linkClick="handleLinkClick"
    />

    <TrackArtistName
      v-if="isRenderArtistName"
      :artists="artists"
      :artistName="artistName"
      :isLinkToLibrary="isLinkToLibrary"
      :profileId="profileId"
      :artistId="artistId"
      @linkClick="handleLinkClick"
    />

    <TrackAlbumTitle
      v-if="isRenderAlbumTitle"
      :albumData="albumData"
      :artistName="artistName"
      :isLinkToLibrary="isLinkToLibrary"
      :profileId="profileId"
      :albumId="albumId"
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
    trackData: Object,
    isWithArtistName: Boolean,
    artistName: String,
    artists: Array,
    albumArtistName: String,
    isWithAlbumTitle: Boolean,
    albumData: Object,
    isLinkToLibrary: Boolean,
    profileId: String,
    trackId: String,
    artistId: String,
    albumId: String
  },
  emits: [
    'linkClick'
  ],
  computed: {
    isRenderArtistName () {
      return (
        this.isWithArtistName && (
          !this.albumArtistName ||
            this.isDifferentNames
        )
      )
    },
    isDifferentNames () {
      return (
        this.artistName.toLowerCase() !==
          this.albumArtistName.toLowerCase()
      )
    },
    isRenderAlbumTitle () {
      return (
        this.isWithAlbumTitle &&
          this.albumData?.title
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
