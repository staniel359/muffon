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

    <BaseSelfSimpleButtons
      model="album"
      :modelData="albumData"
      :isWithLibraryLink="isWithLibraryLink"
      :isWithListenedButton="isWithListenedButton"
      :isWithBookmarkButton="isWithBookmarkButton"
    />
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import ArtistName from './InfoSection/ArtistName.vue'
import BaseAlbumListenersCount
  from '@/models/album/BaseAlbumListenersCount.vue'
import BaseSelfSimpleButtons from '@/models/self/BaseSelfSimpleButtons.vue'

export default {
  name: 'InfoSection',
  components: {
    BaseHeader,
    ArtistName,
    BaseAlbumListenersCount,
    BaseSelfSimpleButtons
  },
  inject: [
    'findPaginationItem'
  ],
  props: {
    albumData: {
      type: Object,
      required: true
    },
    artistName: String,
    isWithArtistName: Boolean,
    isArtistNameActive: Boolean,
    isTracksLinkActive: Boolean,
    isWithListenersCount: Boolean,
    isWithTracksCount: Boolean,
    isWithLibraryLink: Boolean,
    isWithListenedButton: Boolean,
    isWithBookmarkButton: Boolean
  },
  emits: [
    'tracksLinkActiveChange'
  ],
  computed: {
    albumTitle () {
      return this.albumData.title
    },
    uuid () {
      return this.albumData.uuid
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
</style>
