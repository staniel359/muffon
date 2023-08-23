<template>
  <div
    v-if="albumsCount"
  >
    <BaseLinkContainer
      class="main-link"
      :link="link"
    >
      <div class="link">
        <BaseIcon
          icon="album"
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
import BaseIcon from '@/components/icons/BaseIcon.vue'
import {
  albums as formatProfileLibraryArtistAlbumsLink
} from '@/helpers/formatters/links/profile/library/artist'

export default {
  name: 'AlbumsCounterSection',
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
    albumsCount () {
      return this.artistData.albums_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
