<template>
  <BaseLinkContainer
    :link="artistMainLinkFormatted"
    @click="handleLinkClick"
  >
    <BaseSimpleCardContainer
      :image="image"
      isImageCircular
    >
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
import BaseHeader from '@/BaseHeader.vue'
import { artistMain as formatArtistMainLink } from '#/formatters/links'
import { listenersCount as listenersCountDecorated } from '#/decorators'

export default {
  name: 'ArtistItem',
  components: {
    BaseLinkContainer,
    BaseSimpleCardContainer,
    BaseHeader
  },
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
      return this.artistData.image.small
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
