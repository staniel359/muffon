<template>
  <div class="library-counters-container">
    <div></div>

    <BaseLinkContainer
      v-if="isWithTracksCount"
      :link="profileLibraryArtistTracksLinkFormatted"
    >
      <div class="link">
        <i class="music icon"></i>
        <span>
          {{ tracksCount }}
        </span>
      </div>
    </BaseLinkContainer>

    <BaseLinkContainer
      v-if="isWithAlbumsCount"
      :link="profileLibraryArtistAlbumsLinkFormatted"
    >
      <div class="link">
        <i class="record vinyl icon"></i>
        <span>
          {{ albumsCount }}
        </span>
      </div>
    </BaseLinkContainer>

    <div></div>
  </div>
</template>

<script>
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import {
  tracks as formatProfileLibraryArtistTracksLink,
  albums as formatProfileLibraryArtistAlbumsLink
} from '#/formatters/links/profile/library/artist'

export default {
  name: 'LibraryCountersSection',
  components: {
    BaseLinkContainer
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    profileId: {
      type: String,
      required: true
    },
    artistId: {
      type: String,
      required: true
    },
    isWithTracksCount: Boolean,
    isWithAlbumsCount: Boolean
  },
  computed: {
    tracksCount () {
      return this.artistData.tracks_count
    },
    albumsCount () {
      return this.artistData.albums_count
    },
    profileLibraryArtistTracksLinkFormatted () {
      return formatProfileLibraryArtistTracksLink({
        profileId: this.profileId,
        artistId: this.artistId
      })
    },
    profileLibraryArtistAlbumsLinkFormatted () {
      return formatProfileLibraryArtistAlbumsLink({
        profileId: this.profileId,
        artistId: this.artistId
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.library-counters-container
  @extend .d-flex, .w-100, .justify-content-space-evenly
</style>
