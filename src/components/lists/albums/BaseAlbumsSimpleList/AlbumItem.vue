<template>
  <RouterLink
    class="item main-simple-list-item"
    :to="mainPageLinkFormatted"
    @click="handleLinkClick"
  >
    <BaseImage
      :image="image"
      isRounded
      isBordered
    />

    <div class="content">
      <div class="header">
        <h4
          class="main-link"
          :class="{ 'link-active': !isArtistNameActive }"
        >
          {{ albumTitle }}
        </h4>
      </div>

      <div
        v-if="isWithArtistName"
        class="artist-name main-link"
        :class="{ 'link-active': isArtistNameActive }"
        @mouseenter="handleArtistNameMouseEnter"
        @mouseleave="handleArtistNameMouseLeave"
      >
        {{ artistName }}
      </div>

      <BaseAlbumListenersCount
        v-if="isWithListenersCount"
        class="description"
        :artistName="artistName"
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
    isWithArtistName: Boolean,
    isWithListenersCount: Boolean
  },
  emits: [
    'linkClick'
  ],
  data () {
    return {
      isArtistNameActive: false
    }
  },
  computed: {
    artistName () {
      return this.albumData.artist.name
    },
    albumTitle () {
      return this.albumData.title
    },
    image () {
      return this.albumData.image.extrasmall
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
        artistName: this.artistName
      })
    },
    albumMainLinkFormatted () {
      return formatAlbumMainLink({
        artistName: this.artistName,
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
    },
    handleLinkClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped>
.artist-name
  @extend .width-fit-content
</style>
