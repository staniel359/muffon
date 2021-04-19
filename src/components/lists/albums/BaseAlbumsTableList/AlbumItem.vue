<template>
  <RouterLink
    class="ui card main-card-light"
    :to="mainPageLinkFormatted"
  >
    <div></div>
    <div class="image-container main-image-container">
      <BaseImage
        :image="albumImage"
        isRounded
        isBordered
      />
    </div>

    <div class="content">
      <h4
        class="ui header main-header"
        :class="{ 'link-active': !isArtistNameActive }"
      >
        {{ albumTitle }}
      </h4>

      <div
        v-if="isWithArtistName"
        class="artist-name-container"
        :class="{ 'link-active': isArtistNameActive }"
      >
        <div
          @mouseenter="handleArtistNameMouseEnter"
          @mouseleave="handleArtistNameMouseLeave"
        >
          {{ albumArtistName }}
        </div>
      </div>

      <BaseAlbumListenersCount
        v-if="!isSegmentLoading"
        class="description"
        :artistName="albumArtistName"
        :albumTitle="albumTitle"
      />
    </div>
  </RouterLink>
</template>

<script>
import BaseImage from '@/BaseImage.vue'
import BaseAlbumListenersCount
  from '@/models/album/BaseAlbumListenersCount.vue'
import {
  artistMain as formatArtistMainLink,
  albumMain as formatAlbumMainLink
} from '#/formatters/links'

export default {
  name: 'AlbumItem',
  components: {
    BaseImage,
    BaseAlbumListenersCount
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    artistName: String,
    isWithArtistName: Boolean,
    isSegmentLoading: Boolean
  },
  data () {
    return {
      isArtistNameActive: false
    }
  },
  computed: {
    albumTitle () {
      return this.albumData.title
    },
    albumImage () {
      return this.albumData.image.small
    },
    albumArtistName () {
      return (
        this.albumData.artist?.name ||
          this.artistName
      )
    },
    mainPageLinkFormatted () {
      if (this.isArtistNameActive) {
        return this.artistMainLinkFormatted
      } else {
        return this.albumMainLinkFormatted
      }
    },
    artistMainLinkFormatted () {
      return formatArtistMainLink({
        artistName: this.albumArtistName
      })
    },
    albumMainLinkFormatted () {
      return formatAlbumMainLink({
        artistName: this.albumArtistName,
        albumTitle: this.albumTitle
      })
    }
  },
  methods: {
    handleArtistNameMouseEnter () {
      this.isArtistNameActive = true
    },
    handleArtistNameMouseLeave () {
      this.isArtistNameActive = false
    }
  }
}
</script>

<style lang="sass" scoped>
.artist-name-container
  @extend .d-flex, .justify-content-center
</style>
