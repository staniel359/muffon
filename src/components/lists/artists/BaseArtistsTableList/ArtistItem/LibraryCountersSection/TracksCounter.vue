<template>
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
        v-text="tracksCountFormatted"
      />
    </small>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseIcon from '*/components/BaseIcon.vue'
import {
  tracks as formatProfileLibraryArtistTracksLink
} from '*/helpers/formatters/links/profile/library/artist'
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'TracksCounter',
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
    tracksCountFormatted () {
      return formatNumber(
        this.tracksCount
      )
    },
    tracksCount () {
      return this.artistData.tracks_count
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
