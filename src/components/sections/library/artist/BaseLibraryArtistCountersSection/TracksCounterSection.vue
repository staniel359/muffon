<template>
  <div
    v-if="tracksCount"
    class="main-list-right-small-section"
  >
    <BaseLinkContainer
      class="main-link"
      :link="link"
    >
      <BaseListCounterSection
        icon="track"
        :count="tracksCount"
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
  tracks as formatProfileLibraryArtistTracksLink
} from '@/helpers/formatters/links/profile/library/artist'

export default {
  name: 'TracksCounterSection',
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
