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
          icon="music"
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
  tracks as formatProfileLibraryArtistTracksLink
} from '@/helpers/formatters/links/profile/library/artist'

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
      return this.artistData.tracks_count
    },
    tracksCountFormatted () {
      return formatNumber(
        this.tracksCount
      )
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
