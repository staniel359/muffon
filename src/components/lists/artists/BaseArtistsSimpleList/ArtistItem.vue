<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="linkFormatted"
    @click="handleLinkClick"
  >
    <BaseArtistImage
      class="circular bordered"
      size="extrasmall"
      :image="image"
      :artistName="artistName"
      @loadEnd="handleImageLoadEnd"
    />

    <InfoBlock
      :artistName="artistName"
      :listenersCount="listenersCount"
      :uuid="uuid"
      :isWithListenersCount="isWithListenersCount"
    />
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import InfoBlock from './ArtistItem/InfoBlock.vue'
import { artistMain as formatArtistMainLink } from '#/formatters/links'

export default {
  name: 'ArtistItem',
  components: {
    BaseLinkContainer,
    BaseArtistImage,
    InfoBlock
  },
  inject: [
    'findPaginationItem'
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    },
    isWithListenersCount: Boolean
  },
  emits: [
    'linkClick'
  ],
  computed: {
    linkFormatted () {
      return formatArtistMainLink({
        artistName: this.artistName
      })
    },
    image () {
      return this.artistData.image
    },
    artistName () {
      return this.artistData.name
    },
    listenersCount () {
      return this.artistData.listeners_count
    },
    uuid () {
      return this.artistData.uuid
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    },
    handleImageLoadEnd (value) {
      this.findPaginationItem({
        uuid: this.uuid
      }).image = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
