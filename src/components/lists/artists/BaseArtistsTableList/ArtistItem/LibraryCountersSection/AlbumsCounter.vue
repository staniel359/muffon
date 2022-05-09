<template>
  <BaseLinkContainer
    class="main-link"
    :link="link"
    @active-change="handleLinkActiveChange"
  >
    <small>
      <BaseIcon
        icon="record vinyl"
      />

      <span
        v-text="albumsCountFormatted"
      />
    </small>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseIcon from '*/components/BaseIcon.vue'
import {
  albums as formatProfileLibraryArtistAlbumsLink
} from '*/helpers/formatters/links/profile/library/artist'
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'AlbumsCounter',
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
  emits: [
    'linkActiveChange'
  ],
  computed: {
    link () {
      return formatProfileLibraryArtistAlbumsLink(
        {
          profileId: this.profileId,
          libraryArtistId: this.libraryArtistId
        }
      )
    },
    libraryArtistId () {
      return this.artistData.library.id
    },
    albumsCountFormatted () {
      return formatNumber(
        this.albumsCount
      )
    },
    albumsCount () {
      return this.artistData.albums_count
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
