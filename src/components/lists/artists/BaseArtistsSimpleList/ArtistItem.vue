<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="linkFormatted"
    @click="handleLinkClick"
  >
    <BaseArtistImage
      size="extrasmall"
      :artistName="artistName"
      isCircular
      isBordered
    />

    <InfoBlock
      :artistName="artistName"
      :listenersCount="listenersCount"
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
  props: {
    artistData: {
      type: Object,
      required: true
    }
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
    artistName () {
      return this.artistData.name
    },
    listenersCount () {
      return this.artistData.listeners_count
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped></style>
