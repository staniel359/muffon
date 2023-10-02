<template>
  <div
    v-if="tracksCount"
    class="description middle-aligned"
  >
    <BaseCounterBar
      :count="tracksCount"
      :top-count="topTracksCount"
    />

    <BaseLinkContainer
      class="ui main-link"
      :link="link"
      @active-change="handleLinkActiveChange"
      @click="handleLinkClick"
    >
      <BaseListCounterSection
        icon="track"
        :count="tracksCount"
      />
    </BaseLinkContainer>
  </div>
</template>

<script>
import BaseCounterBar from '@/components/BaseCounterBar.vue'
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseListCounterSection
  from '@/components/sections/BaseListCounterSection.vue'
import {
  tracks as formatProfileLibraryArtistTracksLink
} from '@/helpers/formatters/links/profile/library/artist'

export default {
  name: 'TracksCounter',
  components: {
    BaseCounterBar,
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
    topTracksCount: Number
  },
  emits: [
    'linkActiveChange',
    'linkClick'
  ],
  computed: {
    tracksCount () {
      return this.artistData.tracks_count
    },
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
    },
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
