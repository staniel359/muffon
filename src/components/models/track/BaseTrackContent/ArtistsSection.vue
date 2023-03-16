<template>
  <div class="extra">
    <BaseArtistLinkContainer
      v-if="isLinkToLibrary"
      class="main-link"
      :artist-data="artistData"
      :profile-id="profileId"
      :library-artist-id="libraryArtistId"
      is-link-to-library
      @click="handleLinkClick"
    >
      {{ artistName }}
    </BaseArtistLinkContainer>
    <BaseArtistLinks
      v-else
      :artists="artists"
      @link-click="handleLinkClick"
    />
  </div>
</template>

<script>
import BaseArtistLinkContainer
  from '@/components/containers/links/artist/BaseArtistLinkContainer.vue'
import BaseArtistLinks from '@/components/links/BaseArtistLinks.vue'

export default {
  name: 'ArtistsSection',
  components: {
    BaseArtistLinkContainer,
    BaseArtistLinks
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    isLinkToLibrary: Boolean,
    profileId: String
  },
  emits: [
    'linkClick'
  ],
  computed: {
    artistData () {
      return this.trackData.artist
    },
    libraryArtistId () {
      return this.trackData.library.artist.id.toString()
    },
    artistName () {
      return this.artistData.name
    },
    artists () {
      return this.trackData.artists
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
