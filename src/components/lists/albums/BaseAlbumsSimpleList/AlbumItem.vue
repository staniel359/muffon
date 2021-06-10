<template>
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
      :listenersCount="listenersCount"
      :uuid="uuid"
      :isWithArtistName="isWithArtistName"
      :isArtistNameActive="isArtistNameActive"
      :isWithListenersCount="isWithListenersCount"
    />
  </BaseLinkContainer>
</template>

<script>
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
    },
    listenersCount () {
      return this.albumData.listeners_count
    },
    uuid () {
      return this.albumData.uuid
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    },
    setIsArtistNameActive (value) {
      this.isArtistNameActive = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
