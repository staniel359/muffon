<template>
  <div
    v-if="tracksCount"
  >
    <BaseLinkContainer
      class="main-link"
      :link="link"
    >
      <div class="link">
        <BaseIcon
          icon="track"
        />

        <span
          v-text="tracksCount"
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
  tracks as formatProfileLibraryArtistTracksLink
} from '@/helpers/formatters/links/profile/library/artist'

export default {
  name: 'TracksCounterSection',
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
    tracksCount () {
      return this.artistData.tracks_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
