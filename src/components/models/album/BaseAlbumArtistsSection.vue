<template>
  <div>
    <BaseArtistLinkContainer
      v-if="isLinkToLibrary"
      class="main-link"
      :artist-data="artistData"
      :profile-id="profileId"
      :library-artist-id="libraryArtistId"
      is-link-to-library
      @link-active-change="handleLinkActiveChange"
      @link-click="handleLinkClick"
    >
      {{ artistName }}
    </BaseArtistLinkContainer>
    <BaseArtistLinks
      v-else
      :artists="artists"
      @link-active-change="handleLinkActiveChange"
      @link-click="handleLinkClick"
    />
  </div>
</template>

<script>
import BaseArtistLinkContainer
  from '@/components/containers/links/artist/BaseArtistLinkContainer.vue'
import BaseArtistLinks from '@/components/links/BaseArtistLinks.vue'

export default {
  name: 'BaseAlbumArtistsSection',
  components: {
    BaseArtistLinkContainer,
    BaseArtistLinks
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    isLinkToLibrary: Boolean,
    profileId: Number
  },
  emits: [
    'linkActiveChange',
    'linkClick'
  ],
  computed: {
    artistData () {
      return this.albumData.artist
    },
    libraryArtistId () {
      return this
        .albumData
        .library
        .artist
        .id
    },
    artistName () {
      return this.artistData.name
    },
    artists () {
      return this.albumData.artists
    }
  },
  methods: {
    handleLinkActiveChange (
      value
    ) {
      this.$emit(
        'linkActiveChange',
        value
      )
    },
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
