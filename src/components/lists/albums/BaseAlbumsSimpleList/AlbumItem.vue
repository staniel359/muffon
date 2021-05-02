<template>
  <BaseVisibilityItem
    :scrollable="scrollable"
    @visible="handleVisible"
  />

  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="linkFormatted"
    @click="handleLinkClick"
  >
    <BaseImage
      class="rounded bordered"
      :image="image"
    />

    <InfoBlock
      :albumTitle="albumTitle"
      :artistName="artistName"
      :isWithArtistName="isWithArtistName"
      :isArtistNameActive="isArtistNameActive"
      :isWithListenersCount="isWithListenersCount"
      :isVisible="isVisible"
    />
  </BaseLinkContainer>
</template>

<script>
import BaseVisibilityItem from '@/BaseVisibilityItem.vue'
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseImage from '@/BaseImage.vue'
import InfoBlock from './AlbumItem/InfoBlock.vue'
import {
  artistMain as formatArtistMainLink,
  albumMain as formatAlbumMainLink
} from '#/formatters/links'

export default {
  name: 'AlbumItem',
  components: {
    BaseVisibilityItem,
    BaseLinkContainer,
    BaseImage,
    InfoBlock
  },
  provide () {
    return {
      setIsArtistNameActive: this.setIsArtistNameActive
    }
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    scrollable: {
      type: HTMLDivElement,
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
      isArtistNameActive: false,
      isVisible: false
    }
  },
  computed: {
    linkFormatted () {
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
    artistName () {
      return this.albumData.artist.name
    },
    albumMainLinkFormatted () {
      return formatAlbumMainLink({
        artistName: this.artistName,
        albumTitle: this.albumTitle
      })
    },
    albumTitle () {
      return this.albumData.title
    },
    image () {
      return this.albumData.image.extrasmall
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    },
    handleVisible () {
      this.isVisible = true
    },
    setIsArtistNameActive (value) {
      this.isArtistNameActive = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
