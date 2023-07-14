<template>
  <div class="main-small-artist-name">
    <BaseArtistLinkContainer
      class="main-link"
      :artist-data="artistData"
      :profile-id="profileId"
      :library-artist-id="libraryArtistId"
      is-link-to-library
    >
      {{ artistName }}
    </BaseArtistLinkContainer>
  </div>
</template>

<script>
import BaseArtistLinkContainer
  from '@/components/containers/links/artist/BaseArtistLinkContainer.vue'

export default {
  name: 'ArtistSection',
  components: {
    BaseArtistLinkContainer
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    profileId: String
  },
  computed: {
    artistData () {
      return this.albumData.artist
    },
    libraryArtistId () {
      return this.albumData.library.artist.id.toString()
    },
    artistName () {
      return this.artistData.name
    }
  }
}
</script>

<style lang="sass" scoped></style>
