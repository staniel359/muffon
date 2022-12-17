<template>
  <div class="description">
    <BaseLinkContainer
      class="main-link"
      :link="link"
    >
      <small>
        <BaseIcon
          icon="track"
        />

        <span
          v-text="tracksCount"
        />
      </small>
    </BaseLinkContainer>
  </div>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import {
  tracks as formatProfileLibraryAlbumTracksLink
} from '@/helpers/formatters/links/profile/library/album'

export default {
  name: 'TracksSection',
  components: {
    BaseLinkContainer,
    BaseIcon
  },
  props: {
    albumData: {
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
      return formatProfileLibraryAlbumTracksLink(
        {
          profileId: this.profileId,
          libraryAlbumId: this.libraryAlbumId
        }
      )
    },
    libraryAlbumId () {
      return this.albumData.library.id
    },
    tracksCount () {
      return this.albumData.tracks_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
