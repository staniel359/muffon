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
  main as formatProfileLibraryArtistMainLink
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
    isLinkActive: Boolean
  },
  emits: [
    'linkClick'
  ],
  computed: {
    link () {
      if (this.isLinkActive) {
        if (this.isLinkToLibrary) {
          return this.profileLibraryArtistMainLink
        } else {
          return this.artistMainLink
        }
      } else {
        return {}
      }
    },
    profileLibraryArtistMainLink () {
      return formatProfileLibraryArtistMainLink(
        {
          profileId: this.profileId,
          libraryArtistId: this.libraryArtistId
        }
      )
    },
    libraryArtistId () {
      return this.artistData.library.id
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
