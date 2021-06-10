<template>
  <BaseLinkContainer
    :link="artistMainLinkFormatted"
    @click="handleLinkClick"
  >
    <BaseSimpleCardContainer>
      <div class="main-simple-card-image-container">
        <BaseArtistImage
          class="circular bordered"
          :image="image"
          :artistName="artistName"
          @loadEnd="handleImageLoadEnd"
        />
      </div>

      <div class="content">
        <BaseHeader
          class="link"
          tag="h4"
          :text="artistName"
        />

        <BaseArtistListenersCount
          v-if="isWithListenersCount"
          class="description"
          :artistName="artistName"
          :listenersCount="listenersCount"
          @loadEnd="handleListenersCountLoadEnd"
        />
      </div>
    </BaseSimpleCardContainer>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseSimpleCardContainer from '@/containers/BaseSimpleCardContainer.vue'
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseArtistListenersCount
  from '@/models/artist/BaseArtistListenersCount.vue'
import { artistMain as formatArtistMainLink } from '#/formatters/links'

export default {
  name: 'ArtistItem',
  components: {
    BaseLinkContainer,
    BaseSimpleCardContainer,
    BaseArtistImage,
    BaseHeader,
    BaseArtistListenersCount
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
    artistMainLinkFormatted () {
      return formatArtistMainLink({
        artistName: this.artistName
      })
    },
    artistName () {
      return this.artistData.name
    },
    image () {
      return this.artistData.image
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
    },
    handleListenersCountLoadEnd (value) {
      this.findPaginationItem({
        uuid: this.uuid
      }).listeners_count = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
