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

    <BaseSelfIcons
      v-if="isWithSelfIcons"
      :libraryId="libraryId"
      :favoriteId="favoriteId"
      :bookmarkId="bookmarkId"
      :listenedId="listenedId"
    />
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import ArtistName from './InfoSection/ArtistName.vue'
import BaseAlbumListenersCount
  from '@/models/album/BaseAlbumListenersCount.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'

export default {
  name: 'InfoSection',
  components: {
    BaseHeader,
    ArtistName,
    BaseAlbumListenersCount,
    BaseSelfIcons
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
    isArtistNameActive: Boolean,
    isTracksLinkActive: Boolean,
    isWithListenersCount: Boolean,
    isWithTracksCount: Boolean,
    libraryId: String,
    favoriteId: String,
    bookmarkId: String,
    listenedId: String
  },
  emits: [
    'tracksLinkActiveChange'
  ],
  computed: {
    albumTitle () {
      return this.albumData.title
    },
    listenersCount () {
      return this.albumData.listeners_count
    },
    releaseDate () {
      return this.albumData.release_date
    },
    tracksCount () {
      return this.albumData.tracks_count
    },
    isHeaderLink () {
      return (
        !this.isArtistNameActive &&
          !this.isTracksLinkActive
      )
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
  methods: {
    handleListenersCountLoadEnd (value) {
      this.paginationItem.listeners_count = value
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
</style>
