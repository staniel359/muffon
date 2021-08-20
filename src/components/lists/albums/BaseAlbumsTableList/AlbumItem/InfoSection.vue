<template>
  <div class="content">
    <BaseHeader
      tag="h4"
      :class="{ link: isHeaderLink }"
      :text="albumTitle"
    />

    <ArtistName
      v-if="isWithArtistName"
      :artistName="artistName"
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
      :artistName="artistName"
      :listenersCount="listenersCount"
      @loadEnd="handleListenersCountLoadEnd"
    />

    <div
      v-if="isWithTracksCount"
      class="description main-small-container"
      :class="{ link: isTracksLinkActive }"
      @mouseenter="handleTracksLinkMouseEnter"
      @mouseleave="handleTracksLinkMouseLeave"
    >
      <small>
        <i class="music icon"></i>
        <span>
          {{ tracksCount }}
        </span>
      </small>
    </div>

    <BaseProfileLibraryLinkButton
      v-if="isShowLibraryLink"
      class="library-link"
      model="album"
      :modelId="libraryId"
      :profileId="profileId"
    />
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import ArtistName from './InfoSection/ArtistName.vue'
import BaseAlbumListenersCount
  from '@/models/album/BaseAlbumListenersCount.vue'
import BaseProfileLibraryLinkButton from '@/BaseProfileLibraryLinkButton.vue'

export default {
  name: 'InfoSection',
  components: {
    BaseHeader,
    ArtistName,
    BaseAlbumListenersCount,
    BaseProfileLibraryLinkButton
  },
  inject: [
    'findPaginationItem'
  ],
  props: {
    albumTitle: {
      type: String,
      required: true
    },
    artistName: String,
    listenersCount: Number,
    releaseDate: String,
    uuid: String,
    isWithArtistName: Boolean,
    isArtistNameActive: Boolean,
    isTracksLinkActive: Boolean,
    isWithListenersCount: Boolean,
    isWithTracksCount: Boolean,
    tracksCount: Number,
    isWithLibraryLink: Boolean,
    profileId: String,
    libraryId: String
  },
  emits: [
    'tracksLinkActiveChange'
  ],
  computed: {
    isHeaderLink () {
      return (
        !this.isArtistNameActive &&
          !this.isTracksLinkActive
      )
    },
    isShowLibraryLink () {
      return (
        this.isWithLibraryLink &&
          !!this.libraryId
      )
    }
  },
  methods: {
    handleListenersCountLoadEnd (value) {
      this.findPaginationItem({
        uuid: this.uuid
      }).listeners_count = value
    },
    handleTracksLinkMouseEnter () {
      this.$emit(
        'tracksLinkActiveChange',
        true
      )
    },
    handleTracksLinkMouseLeave () {
      this.$emit(
        'tracksLinkActiveChange',
        false
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.description
  &.release-date
    @extend .no-margin

.library-link
  margin-top: 0.5em !important
</style>
