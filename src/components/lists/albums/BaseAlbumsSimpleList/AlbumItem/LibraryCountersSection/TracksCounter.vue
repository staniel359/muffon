<template>
  <div class="description main-counter-bar-container">
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
      <small>
        <BaseIcon
          icon="track"
        />

        <span
          v-text="tracksCountFormatted"
        />
      </small>
    </BaseLinkContainer>
  </div>
</template>

<script>
import BaseCounterBar from '@/components/BaseCounterBar.vue'
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'
import {
  tracks as formatProfileLibraryAlbumTracksLink
} from '@/helpers/formatters/links/profile/library/album'

export default {
  name: 'TracksCounter',
  components: {
    BaseCounterBar,
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
    },
    topTracksCount: Number
  },
  emits: [
    'linkActiveChange',
    'linkClick'
  ],
  computed: {
    tracksCount () {
      return this.albumData.tracks_count
    },
    tracksCountFormatted () {
      return formatNumber(
        this.tracksCount
      )
    },
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
