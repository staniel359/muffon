<template>
  <div
    v-if="tracksCount"
    class="description main-counters-section"
  >
    <BaseLinkContainer
      class="main-link"
      :link="link"
    >
      <BaseListCounterSection
        icon="track"
        :count="tracksCount"
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
  tracks as formatProfileLibraryAlbumTracksLink
} from '@/helpers/formatters/links/profile/library/album'

export default {
  name: 'TracksSection',
  components: {
    BaseLinkContainer,
    BaseListCounterSection
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    profileId: {
      type: Number,
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
