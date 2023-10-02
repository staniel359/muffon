<template>
  <div
    v-if="albumsCount"
    class="main-list-right-small-section"
  >
    <BaseLinkContainer
      class="main-link"
      :link="link"
    >
      <BaseListCounterSection
        icon="album"
        :count="albumsCount"
        :is-small="isSmall"
      />
    </BaseLinkContainer>
  </div>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseListCounterSection
  from '@/components/sections/BaseListCounterSection.vue'
import {
  albums as formatProfileLibraryArtistAlbumsLink
} from '@/helpers/formatters/links/profile/library/artist'

export default {
  name: 'AlbumsCounterSection',
  components: {
    BaseLinkContainer,
    BaseListCounterSection
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    profileId: {
      type: String,
      required: true
    },
    isSmall: Boolean
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
