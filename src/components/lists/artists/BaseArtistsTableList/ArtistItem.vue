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
          :tag="headerTag"
          :text="artistName"
        />

        <div
          v-if="isWithListenersCount"
          class="description"
        >
          {{ listenersCountFormatted }}
        </div>
      </div>
    </BaseSimpleCardContainer>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseSimpleCardContainer from '@/containers/BaseSimpleCardContainer.vue'
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import { artistMain as formatArtistMainLink } from '#/formatters/links'
import { listenersCount as listenersCountDecorated } from '#/decorators'

export default {
  name: 'ArtistItem',
  components: {
    BaseLinkContainer,
    BaseSimpleCardContainer,
    BaseArtistImage,
    BaseHeader
  },
  inject: [
    'setPaginationItemImage'
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    },
    isSmall: Boolean,
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
    headerTag () {
      return this.isSmall ? 'h4' : 'h3'
    },
    listenersCount () {
      return this.artistData.listeners_count || 0
    },
    listenersCountFormatted () {
      return listenersCountDecorated(
        this.listenersCount
      )
    },
    uuid () {
      return this.artistData.uuid
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    },
    handleImageLoadEnd (image) {
      this.setPaginationItemImage({
        uuid: this.uuid,
        image
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
