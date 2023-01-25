<template>
  <div class="description main-counter-bar-container">
    <BaseCounterBar
      :count="albumsCount"
      :top-count="topAlbumsCount"
    />

    <BaseLinkContainer
      class="ui main-link"
      :link="link"
      @active-change="handleLinkActiveChange"
      @click="handleLinkClick"
    >
      <small>
        <BaseIcon
          icon="album"
        />

        <span
          v-text="albumsCountFormatted"
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
  albums as formatProfileLibraryArtistAlbumsLink
} from '@/helpers/formatters/links/profile/library/artist'

export default {
  name: 'AlbumsCounter',
  components: {
    BaseCounterBar,
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
    topAlbumsCount: Number
  },
  emits: [
    'linkActiveChange',
    'linkClick'
  ],
  computed: {
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
