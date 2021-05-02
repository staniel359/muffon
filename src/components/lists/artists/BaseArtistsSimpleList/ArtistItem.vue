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
    <BaseArtistImage
      class="circular bordered"
      size="extrasmall"
      :artistName="artistName"
      :isVisible="isVisible"
    />

    <InfoBlock
      :artistName="artistName"
      :listenersCount="listenersCount"
    />
  </BaseLinkContainer>
</template>

<script>
import BaseVisibilityItem from '@/BaseVisibilityItem.vue'
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import InfoBlock from './ArtistItem/InfoBlock.vue'
import { artistMain as formatArtistMainLink } from '#/formatters/links'

export default {
  name: 'ArtistItem',
  components: {
    BaseVisibilityItem,
    BaseLinkContainer,
    BaseArtistImage,
    InfoBlock
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    scrollable: {
      type: HTMLDivElement,
      required: true
    }
  },
  emits: [
    'linkClick'
  ],
  data () {
    return {
      isVisible: false
    }
  },
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
    },
    handleVisible () {
      this.isVisible = true
    }
  }
}
</script>

<style lang="sass" scoped></style>
