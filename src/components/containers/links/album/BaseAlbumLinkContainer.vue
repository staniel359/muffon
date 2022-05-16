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
import formatRequestAlbumData from '*/helpers/formatters/request/album/data'

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
    artistName: String,
    isLinkToLibrary: Boolean,
    profileId: String,
    libraryAlbumId: String
  },
  emits: [
    'linkClick'
  ],
  computed: {
    link () {
      if (this.isLinkToLibrary) {
        return this.profileLibraryAlbumMainLink
      } else {
        return this.albumMainLink
      }
    },
    profileLibraryAlbumMainLink () {
      return formatProfileLibraryAlbumMainLink(
        {
          profileId: this.profileId,
          libraryAlbumId:
            this.libraryAlbumIdComputed
        }
      )
    },
    libraryAlbumIdComputed () {
      return (
        this.albumData.library?.id ||
          this.libraryAlbumId
      )
    },
    albumMainLink () {
      return formatAlbumMainLink(
        {
          albumTitle: this.albumTitle,
          artistName: this.artistNameComputed,
          sourceParams: this.sourceParams
        }
      )
    },
    albumTitle () {
      return this.albumData.title
    },
    artistNameComputed () {
      return (
        this.albumData.artist?.name ||
          this.artistName
      )
    },
    sourceParams () {
      return formatRequestAlbumData(
        {
          albumData: this.albumData,
          artistName: this.artistNameComputed
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
