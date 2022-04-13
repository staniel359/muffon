<template>
  <div class="library-counters-container">
    <BaseLinkContainer
      class="tracks-counter"
      :link="profileLibraryArtistTracksLink"
    >
      <div class="link">
        <i class="music icon" />

        <span
          v-text="tracksCount"
        />
      </div>
    </BaseLinkContainer>

    <BaseLinkContainer
      :link="profileLibraryArtistAlbumsLink"
    >
      <div class="link">
        <i class="record vinyl icon" />

        <span
          v-text="albumsCount"
        />
      </div>
    </BaseLinkContainer>
  </div>
</template>

<script>
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import {
  tracks as formatProfileLibraryArtistTracksLink,
  albums as formatProfileLibraryArtistAlbumsLink
} from '*/helpers/formatters/links/profile/library/artist'

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
    }
  },
  computed: {
    profileLibraryArtistTracksLink () {
      return formatProfileLibraryArtistTracksLink(
        {
          profileId: this.profileId,
          artistId: this.artistId
        }
      )
    },
    artistId () {
      return this.artistData.id
    },
    tracksCount () {
      return this.artistData.tracks_count
    },
    profileLibraryArtistAlbumsLink () {
      return formatProfileLibraryArtistAlbumsLink(
        {
          profileId: this.profileId,
          artistId: this.artistId
        }
      )
    },
    albumsCount () {
      return this.artistData.albums_count
    }
  }
}
</script>

<style lang="sass" scoped>
.library-counters-container
  @extend .d-flex, .justify-content-center
  margin-top: 0.5em
  .tracks-counter
    margin-right: 1em
</style>
