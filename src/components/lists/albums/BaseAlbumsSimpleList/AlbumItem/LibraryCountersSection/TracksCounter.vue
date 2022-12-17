<template>
  <div class="description counter-section">
    <div
      class="counter-bar"
      :class="{
        inverted: isDarkMode
      }"
      :style="{
        width: counterBarWidthFormatted
      }"
    />

    <BaseLinkContainer
      class="ui main-link"
      :link="link"
      @active-change="handleLinkActiveChange"
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
    widthMaxPercent: {
      type: Number,
      required: true
    },
    topTracksCount: {
      type: Number,
      required: true
    },
    isDarkMode: Boolean
  },
  emits: [
    'linkActiveChange'
  ],
  computed: {
    counterBarWidthFormatted () {
      return `${this.counterBarWidth}%`
    },
    counterBarWidth () {
      return (
        this.tracksCount *
          this.widthMaxPercent /
          this.topTracksCount
      )
    },
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
