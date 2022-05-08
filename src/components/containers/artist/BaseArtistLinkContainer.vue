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
  main as formatProfileLibraryArtistMainLink,
  tracks as formatProfileLibraryArtistTracksLink,
  albums as formatProfileLibraryArtistAlbumsLink
} from '*/helpers/formatters/links/profile/library/artist'
import {
  main as formatArtistMainLink
} from '*/helpers/formatters/links/artist'

export default {
  name: 'BaseArtistLinkContainer',
  components: {
    BaseLinkContainer
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    profileId: String,
    isLinkToLibrary: Boolean,
    isTracksActive: Boolean,
    isAlbumsActive: Boolean
  },
  emits: [
    'linkClick'
  ],
  computed: {
    link () {
      if (this.isLinkToLibrary) {
        if (this.isTracksActive) {
          return this.profileLibraryArtistTracksLink
        } else if (this.isAlbumsActive) {
          return this.profileLibraryArtistAlbumsLink
        } else {
          return this.profileLibraryArtistMainLink
        }
      } else {
        return this.artistMainLink
      }
    },
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
    profileLibraryArtistAlbumsLink () {
      return formatProfileLibraryArtistAlbumsLink(
        {
          profileId: this.profileId,
          libraryArtistId: this.libraryArtistId
        }
      )
    },
    profileLibraryArtistMainLink () {
      return formatProfileLibraryArtistMainLink(
        {
          profileId: this.profileId,
          libraryArtistId: this.libraryArtistId
        }
      )
    },
    artistMainLink () {
      return formatArtistMainLink(
        {
          artistName: this.artistName
        }
      )
    },
    artistName () {
      return this.artistData.name
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
