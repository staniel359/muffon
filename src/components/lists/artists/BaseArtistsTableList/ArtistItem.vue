<template>
  <BaseArtistLinkContainer
    :artistData="artistData"
    :profileId="profileId"
    :isLinkToLibrary="isLinkToLibrary"
    :isTracksActive="isTracksActive"
    :isAlbumsActive="isAlbumsActive"
    @click="handleLinkClick"
  >
    <BaseSimpleCardContainer
      :isWithImage="false"
    >
      <div class="main-simple-card-image-container">
        <BaseArtistImage
          class="circular bordered"
          size="medium"
          :imageData="imageData"
          :artistName="artistName"
          @loadEnd="handleImageLoadEnd"
        />
      </div>

      <BaseOptionsDropdown
        model="artist"
        :artistName="artistName"
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
          :class="{ link: isHeaderActive }"
          tag="h4"
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
          v-if="isWithLibrary"
          :artistData="artistData"
          :isTracksActive="isTracksActive"
          :isAlbumsActive="isAlbumsActive"
          @tracksActiveChange="handleTracksActiveChange"
          @albumsActiveChange="handleAlbumsActiveChange"
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
  </BaseArtistLinkContainer>
</template>

<script>
import BaseArtistLinkContainer
  from '@/containers/artist/BaseArtistLinkContainer.vue'
import BaseSimpleCardContainer from '@/containers/BaseSimpleCardContainer.vue'
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseArtistListenersCount
  from '@/models/artist/BaseArtistListenersCount.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'

export default {
  name: 'ArtistItem',
  components: {
    BaseArtistLinkContainer,
    BaseSimpleCardContainer,
    BaseArtistImage,
    BaseOptionsDropdown,
    BaseHeader,
    BaseArtistListenersCount,
    LibraryCountersSection,
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
    artistData: {
      type: Object,
      required: true
    },
    isWithSelfIcons: {
      type: Boolean,
      default: true
    },
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
      isTracksActive: false,
      isAlbumsActive: false,
      libraryId: null,
      favoriteId: null,
      bookmarkId: null,
      listenedId: null
    }
  },
  computed: {
    artistName () {
      return this.artistData.name
    },
    imageData () {
      return this.artistData.image
    },
    listenersCount () {
      return this.artistData.listeners_count
    },
    isHeaderActive () {
      return !(
        this.isTracksActive ||
          this.isAlbumsActive
      )
    },
    paginationItem () {
      return this.findPaginationItem({
        uuid: this.uuid
      })
    },
    uuid () {
      return this.artistData.uuid
    }
  },
  mounted () {
    this.libraryId =
      this.artistData.library_id?.toString()
    this.favoriteId =
      this.artistData.favorite_id?.toString()
    this.bookmarkId =
      this.artistData.bookmark_id?.toString()
    this.listenedId =
      this.artistData.listened_id?.toString()
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    },
    handleImageLoadEnd (value) {
      this.paginationItem.image = value
    },
    handleListenersCountLoadEnd (value) {
      this.paginationItem.listeners_count = value
    },
    handleTracksActiveChange (value) {
      this.isTracksActive = value
    },
    handleAlbumsActiveChange (value) {
      this.isAlbumsActive = value
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

<style lang="sass" scoped></style>
