<template>
  <BaseLinkContainer
    :link="link"
    @click="handleLinkClick"
  >
    <slot />
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import {
  main as formatProfileLibraryAlbumMainLink
} from '*/helpers/formatters/links/profile/library/album'
import {
  main as formatAlbumMainLink
} from '*/helpers/formatters/links/album'
import formatAlbumRequestData from '*/helpers/formatters/request/album/data'

export default {
  name: 'BaseAlbumLinkContainer',
  components: {
    BaseLinkContainer
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    profileId: String,
    artistName: String,
    isLinkToLibrary: Boolean,
    isLinkActive: Boolean
  },
  emits: [
    'linkClick'
  ],
  computed: {
    link () {
      if (this.isLinkActive) {
        if (this.isLinkToLibrary) {
          return this.profileLibraryAlbumMainLink
        } else {
          return this.albumMainLink
        }
      } else {
        return {}
      }
    },
    profileLibraryAlbumMainLink () {
      return formatProfileLibraryAlbumMainLink(
        {
          profileId: this.profileId,
          libraryAlbumId: this.libraryAlbumId
        }
      )
    },
    libraryAlbumId () {
      return this.albumData.library.id
    },
    albumMainLink () {
      return formatAlbumMainLink(
        {
          artistName: this.artistName,
          albumTitle: this.albumTitle,
          sourceParams: this.sourceParams
        }
      )
    },
    albumTitle () {
      return this.albumData.title
    },
    sourceParams () {
      return formatAlbumRequestData(
        {
          sourceId: this.albumData.source_id,
          albumData: this.albumData,
          artistName: this.artistName
        }
      )
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
