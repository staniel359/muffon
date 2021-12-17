<template>
  <BaseAlbumLinkContainer
    :albumData="albumData"
    :profileId="profileId"
    :artistName="artistName"
    :isLinkToLibrary="isLinkToLibrary"
    :isArtistNameActive="isArtistNameActive"
    :isTracksActive="isTracksActive"
    @linkClick="handleLinkClick"
  >
    <BaseSimpleCardContainer
      model="album"
      :image="imageData?.medium"
    >
      <BaseOptionsDropdown
        class="options"
        model="album"
        :artistName="albumArtistName"
        :albumTitle="albumTitle"
        :imageUrl="imageData?.original"
        :libraryId="libraryId"
        :favoriteId="favoriteId"
        :bookmarkId="bookmarkId"
        :listenedId="listenedId"
        :isWithLibraryOption="isWithLibraryOption"
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithBookmarkOption="isWithBookmarkOption"
        :isWithListenedOption="isWithListenedOption"
        :isWithDeleteOption="isWithDeleteOption"
        :isTransparent="false"
        @linkClick="handleLinkClick"
      />

      <div class="content">
        <BaseHeader
          tag="h4"
          :class="{ link: isHeaderActive }"
          :text="albumTitle"
        />

        <ArtistNameSection
          v-if="isWithArtistName"
          :artistName="albumArtistName"
          :isArtistNameActive="isArtistNameActive"
          @activeChange="handleArtistNameActiveChange"
        />

        <div
          v-if="releaseDate"
          class="description release-date"
        >
          {{ releaseDate }}
        </div>

        <BaseAlbumListenersCount
          v-if="isWithListenersCount"
          class="description"
          :albumTitle="albumTitle"
          :artistName="albumArtistName"
          :listenersCount="listenersCount"
          @loadEnd="handleListenersCountLoadEnd"
        />

        <TracksSection
          v-if="isWithLibrary"
          :albumData="albumData"
          :isTracksActive="isTracksActive"
          @activeChange="handleTracksActiveChange"
        />

        <BaseSelfIcons
          v-if="isWithSelfIcons"
          :libraryId="libraryId"
          :favoriteId="favoriteId"
          :bookmarkId="bookmarkId"
          :listenedId="listenedId"
        />
      </div>
    </BaseSimpleCardContainer>
  </BaseAlbumLinkContainer>
</template>

<script>
import BaseAlbumLinkContainer
  from '@/containers/album/BaseAlbumLinkContainer.vue'
import BaseSimpleCardContainer from '@/containers/BaseSimpleCardContainer.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import BaseHeader from '@/BaseHeader.vue'
import ArtistNameSection from './AlbumItem/ArtistNameSection.vue'
import BaseAlbumListenersCount
  from '@/models/album/BaseAlbumListenersCount.vue'
import TracksSection from './AlbumItem/TracksSection.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'

export default {
  name: 'AlbumItem',
  components: {
    BaseAlbumLinkContainer,
    BaseSimpleCardContainer,
    BaseOptionsDropdown,
    BaseHeader,
    ArtistNameSection,
    BaseAlbumListenersCount,
    TracksSection,
    BaseSelfIcons
  },
  provide () {
    return {
      setLibraryId: this.setLibraryId,
      setFavoriteId: this.setFavoriteId,
      setBookmarkId: this.setBookmarkId,
      setListenedId: this.setListenedId
    }
  },
  inject: [
    'findPaginationItem'
  ],
  props: {
    albumData: {
      type: Object,
      required: true
    },
    isWithSelfIcons: {
      type: Boolean,
      default: true
    },
    artistName: String,
    isWithArtistName: Boolean,
    isWithListenersCount: Boolean,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithDeleteOption: Boolean
  },
  emits: [
    'linkClick'
  ],
  data () {
    return {
      libraryId: null,
      favoriteId: null,
      bookmarkId: null,
      listenedId: null,
      isArtistNameActive: false,
      isTracksActive: false
    }
  },
  computed: {
    albumArtistName () {
      return (
        this.albumData.artist?.name ||
          this.artistName
      )
    },
    albumTitle () {
      return this.albumData.title
    },
    imageData () {
      return this.albumData.image
    },
    isHeaderActive () {
      return !(
        this.isArtistNameActive ||
          this.isTracksActive
      )
    },
    releaseDate () {
      return this.albumData.release_date
    },
    listenersCount () {
      return this.albumData.listeners_count
    },
    paginationItem () {
      return this.findPaginationItem({
        uuid: this.uuid
      })
    },
    uuid () {
      return this.albumData.uuid
    }
  },
  mounted () {
    this.libraryId =
      this.albumData.library_id?.toString()
    this.favoriteId =
      this.albumData.favorite_id?.toString()
    this.bookmarkId =
      this.albumData.bookmark_id?.toString()
    this.listenedId =
      this.albumData.listened_id?.toString()
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    },
    handleArtistNameActiveChange (value) {
      this.isArtistNameActive = value
    },
    handleTracksActiveChange (value) {
      this.isTracksActive = value
    },
    handleListenersCountLoadEnd (value) {
      this.paginationItem.listeners_count = value
    },
    setLibraryId (value) {
      this.libraryId = value
    },
    setFavoriteId (value) {
      this.favoriteId = value
    },
    setBookmarkId (value) {
      this.bookmarkId = value
    },
    setListenedId (value) {
      this.listenedId = value
    }
  }
}
</script>

<style lang="sass" scoped>
.content
  @extend .d-flex, .flex-column, .align-items-center

.release-date
  line-height: 1em
</style>
