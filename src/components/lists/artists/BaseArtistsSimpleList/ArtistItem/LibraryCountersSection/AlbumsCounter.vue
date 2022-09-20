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
          icon="record vinyl"
        />

        <span
          v-text="albumsCountFormatted"
        />
      </small>
    </BaseLinkContainer>
  </div>
</template>

<script>
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'
import {
  albums as formatProfileLibraryArtistAlbumsLink
} from '@/helpers/formatters/links/profile/library/artist'

export default {
  name: 'AlbumsCounter',
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
    topAlbumsCount: {
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
        this.albumsCount *
          this.widthMaxPercent /
          this.topAlbumsCount
      )
    },
    albumsCount () {
      return this.artistData.albums_count
    },
    albumsCountFormatted () {
      return formatNumber(
        this.albumsCount
      )
    },
    link () {
      return formatProfileLibraryArtistAlbumsLink(
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
