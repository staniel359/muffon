<template>
  <BaseArtistLinkContainer
    :artist-data="artistData"
    :is-link-to-library="isLinkToLibrary"
    :profile-id="profileId"
    :is-link-active="isMainLinkActive"
    @click="handleLinkClick"
  >
    <BaseSimpleCardContainer
      :is-with-image="false"
    >
      <div class="main-simple-card-image-container">
        <BaseArtistImage
          class="circular bordered"
          size="small"
          :image-data="imageData"
          :artist-name="artistName"
          @load-end="handleImageLoadEnd"
        />
      </div>

      <BaseOptionsDropdown
        model="artist"
        :artist-name="artistName"
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
        :share-data="shareData"
        :is-with-library-option="isWithLibraryOption"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-bookmark-option="isWithBookmarkOption"
        :is-with-listened-option="isWithListenedOption"
        :is-with-share-option="isWithShareOption"
        :is-with-delete-option="isWithDeleteOption"
        :is-transparent="false"
        @link-click="handleLinkClick"
      />

      <div class="content">
        <BaseHeader
          :class="{
            link: isMainLinkActive
          }"
          tag="h4"
          :text="artistName"
        />

        <BaseArtistListenersCount
          v-if="isWithListenersCount"
          class="description"
          :artist-name="artistName"
          :listeners-count="listenersCount"
          @load-end="handleListenersCountLoadEnd"
        />

        <LibraryCountersSection
          v-if="isWithLibrary"
          :artist-data="artistData"
          :profile-id="profileId"
          @link-active-change="handleCounterLinkActiveChange"
        />

        <BaseSelfIcons
          v-if="isWithSelfIcons"
          :library-id="libraryId"
          :favorite-id="favoriteId"
          :bookmark-id="bookmarkId"
          :listened-id="listenedId"
        />
      </div>
    </BaseSimpleCardContainer>
  </BaseArtistLinkContainer>
</template>

<script>
import BaseArtistLinkContainer
  from '*/components/containers/artist/BaseArtistLinkContainer.vue'
import BaseSimpleCardContainer
  from '*/components/containers/cards/BaseSimpleCardContainer.vue'
import BaseArtistImage from '*/components/models/artist/BaseArtistImage.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseArtistListenersCount
  from '*/components/models/artist/BaseArtistListenersCount.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import selfMixin from '*/mixins/selfMixin'
import {
  artist as formatArtistShareData
} from '*/helpers/formatters/share'

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
  mixins: [
    selfMixin
  ],
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
    isWithShareOption: Boolean,
    isWithDeleteOption: Boolean
  },
  emits: [
    'linkClick'
  ],
  data () {
    return {
      isCounterLinkActive: false
    }
  },
  computed: {
    modelData () {
      return this.artistData
    },
    artistName () {
      return this.artistData.name
    },
    imageData () {
      return this.artistData.image
    },
    listenersCount () {
      return this.artistData.listeners_count
    },
    isMainLinkActive () {
      return !this.isCounterLinkActive
    },
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    uuid () {
      return this.artistData.uuid
    },
    shareData () {
      return formatArtistShareData(
        this.artistData
      )
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleImageLoadEnd (
      value
    ) {
      this.paginationItem
        .image = value
    },
    handleListenersCountLoadEnd (
      value
    ) {
      this.paginationItem
        .listeners_count = value
    },
    handleCounterLinkActiveChange (
      value
    ) {
      this.isCounterLinkActive = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
