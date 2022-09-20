<template>
  <div class="library-counters-container">
    <BaseLinkContainer
      class="tracks-counter"
      :link="profileLibraryArtistTracksLink"
    >
      <div class="link">
        <BaseIcon
          icon="music"
        />

        <span
          v-text="tracksCount"
        />
      </div>
    </BaseLinkContainer>

    <BaseLinkContainer
      :link="profileLibraryArtistAlbumsLink"
    >
      <div class="link">
        <BaseIcon
          icon="record vinyl"
        />

        <span
          v-text="albumsCount"
        />
      </div>
    </BaseLinkContainer>
  </div>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import {
  tracks as formatProfileLibraryArtistTracksLink,
  albums as formatProfileLibraryArtistAlbumsLink
} from '@/helpers/formatters/links/profile/library/artist'

export default {
  name: 'LibraryCountersSection',
  components: {
    BaseLinkContainer,
    BaseIcon
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
          libraryArtistId: this.libraryArtistId
        }
      )
    },
    libraryArtistId () {
      return this.artistData.library.id
    },
    tracksCount () {
      return this.artistData.tracks_count
    },
    profileLibraryArtistAlbumsLink () {
      return formatProfileLibraryArtistAlbumsLink(
        {
          profileId: this.profileId,
          libraryArtistId: this.libraryArtistId
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
