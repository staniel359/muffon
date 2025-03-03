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
    trackData: {
      type: Object,
      required: true
    },
    profileId: Number
  },
  computed: {
    artistData () {
      return this.trackData.artist
    },
    libraryArtistId () {
      return this
        .trackData
        .library
        .artist
        .id
    },
    artistName () {
      return this.artistData.name
    }
  }
}
</script>

<style lang="sass" scoped></style>
