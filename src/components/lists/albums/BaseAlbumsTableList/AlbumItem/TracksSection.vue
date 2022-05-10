<template>
  <span class="description main-small-container">
    <BaseLinkContainer
      class="main-link"
      :link="link"
      @active-change="handleLinkActiveChange"
    >
      <small>
        <BaseIcon
          icon="music"
        />

        <span
          v-text="tracksCount"
        />
      </small>
    </BaseLinkContainer>
  </span>
</template>

<script>
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseIcon from '*/components/BaseIcon.vue'
import {
  tracks as formatProfileLibraryAlbumTracksLink
} from '*/helpers/formatters/links/profile/library/album'

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
  emits: [
    'linkActiveChange'
  ],
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
