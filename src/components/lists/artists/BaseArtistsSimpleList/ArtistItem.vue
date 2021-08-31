<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="linkFormatted"
    @click="handleLinkClick"
  >
    <BaseArtistImage
      class="circular bordered"
      size="extrasmall"
      :class="{ small: isImageSmall }"
      :image="image"
      :artistName="artistName"
      @loadEnd="handleImageLoadEnd"
    />

    <div class="content">
      <BaseHeader
        tag="h4"
        :class="{ link: isHeaderLink }"
        :text="artistName"
      />

      <BaseArtistListenersCount
        v-if="isWithListenersCount"
        class="description"
        :artistName="artistName"
        :listenersCount="listenersCount"
        @loadEnd="handleListenersCountLoadEnd"
      />

      <LibraryCountersSection
        :isWithTracksCount="isWithTracksCount"
        :tracksCount="tracksCount"
        :topTracksCount="topTracksCount"
        :isWithAlbumsCount="isWithAlbumsCount"
        :albumsCount="albumsCount"
        :topAlbumsCount="topAlbumsCount"
        @tracksLinkActiveChange="handleTracksLinkActiveChange"
        @albumsLinkActiveChange="handleAlbumsLinkActiveChange"
      />
    </div>

    <div class="main-simple-self-buttons">
      <BaseLibrarySimpleButton
        v-if="isShowLibraryLink"
        class="main-simple-self-button"
        model="artist"
        :modelId="libraryId"
        @click="handleLinkClick"
      />

      <BaseListenedSimpleButton
        v-if="isShowListenedButton"
        class="main-simple-self-button"
        model="artist"
        :modelId="listenedId"
      />
    </div>

    <BaseClearButton
      v-if="isWithClearButton"
      class="delete-button"
      @click="handleDeleteButtonClick"
    />
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseArtistListenersCount
  from '@/models/artist/BaseArtistListenersCount.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseLibrarySimpleButton from '@/models/self/BaseLibrarySimpleButton.vue'
import BaseListenedSimpleButton
  from '@/models/self/BaseListenedSimpleButton.vue'
import BaseClearButton from '@/BaseClearButton.vue'
import { main as formatArtistMainLink } from '#/formatters/links/artist'
import {
  main as formatProfileLibraryArtistMainLink,
  tracks as formatProfileLibraryArtistTracksLink,
  albums as formatProfileLibraryArtistAlbumsLink
} from '#/formatters/links/profile/library/artist'

export default {
  name: 'ArtistItem',
  components: {
    BaseLinkContainer,
    BaseArtistImage,
    BaseHeader,
    BaseArtistListenersCount,
    LibraryCountersSection,
    BaseListenedSimpleButton,
    BaseLibrarySimpleButton,
    BaseClearButton
  },
  inject: [
    'findPaginationItem'
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    },
    isWithListenersCount: Boolean,
    isWithTracksCount: Boolean,
    topTracksCount: Number,
    isWithAlbumsCount: Boolean,
    topAlbumsCount: Number,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithLibraryLink: Boolean,
    isWithListenedButton: Boolean,
    isWithClearButton: Boolean,
    isImageSmall: Boolean
  },
  emits: [
    'linkClick',
    'deleteButtonClick'
  ],
  data () {
    return {
      isTracksLinkActive: false,
      isAlbumsLinkActive: false
    }
  },
  computed: {
    linkFormatted () {
      if (this.isLinkToLibrary) {
        if (this.isTracksLinkActive) {
          return formatProfileLibraryArtistTracksLink({
            profileId: this.profileId,
            artistId: this.artistId
          })
        } else if (this.isAlbumsLinkActive) {
          return formatProfileLibraryArtistAlbumsLink({
            profileId: this.profileId,
            artistId: this.artistId
          })
        } else {
          return formatProfileLibraryArtistMainLink({
            profileId: this.profileId,
            artistId: this.artistId
          })
        }
      } else {
        return formatArtistMainLink({
          artistName: this.artistName
        })
      }
    },
    artistId () {
      return this.artistData.id
    },
    image () {
      return this.artistData.image
    },
    artistName () {
      return this.artistData.name
    },
    listenersCount () {
      return this.artistData.listeners_count
    },
    uuid () {
      return this.artistData.uuid
    },
    tracksCount () {
      return this.artistData.tracks_count
    },
    albumsCount () {
      return this.artistData.albums_count
    },
    isHeaderLink () {
      return (
        !this.isTracksLinkActive &&
          !this.isAlbumsLinkActive
      )
    },
    isShowLibraryLink () {
      return (
        this.isWithLibraryLink &&
          !!this.libraryId
      )
    },
    libraryId () {
      return this.artistData.library_id?.toString()
    },
    isShowListenedButton () {
      return (
        this.isWithListenedButton &&
          !!this.listenedId
      )
    },
    listenedId () {
      return this.artistData.listened_id?.toString()
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    },
    handleImageLoadEnd (value) {
      this.findPaginationItem({
        uuid: this.uuid
      }).image = value
    },
    handleListenersCountLoadEnd (value) {
      this.findPaginationItem({
        uuid: this.uuid
      }).listeners_count = value
    },
    handleTracksLinkActiveChange (value) {
      this.isTracksLinkActive = value
    },
    handleAlbumsLinkActiveChange (value) {
      this.isAlbumsLinkActive = value
    },
    handleDeleteButtonClick () {
      this.$emit(
        'deleteButtonClick',
        { uuid: this.artistData.uuid }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.main-simple-self-buttons
  margin-left: 0.5em !important

.delete-button
  margin-left: 0.5em !important
</style>
