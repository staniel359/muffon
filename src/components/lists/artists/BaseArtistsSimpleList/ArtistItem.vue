<template>
  <RouterLink
    class="item main-simple-list-item"
    :to="artistMainLinkFormatted"
    @click="handleLinkClick"
  >
    <BaseArtistImage
      size="extrasmall"
      :artistName="artistName"
      isCircular
      isBordered
    />
    <div class="content">
      <div class="header">
        <h4 class="link-active">
          {{ artistName }}
        </h4>
      </div>
      <div class="description">
        {{ listenersCountFormatted }}
      </div>
    </div>
  </RouterLink>
</template>

<script>
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import { artistMain as formatArtistMainLink } from '#/formatters/links'
import { listenersCount as listenersCountDecorated } from '#/decorators'

export default {
  name: 'ArtistItem',
  components: {
    BaseArtistImage
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
    artistName () {
      return this.artistData.name
    },
    listenersCount () {
      return this.artistData.listeners_count
    },
    listenersCountFormatted () {
      return listenersCountDecorated(
        this.listenersCount
      )
    },
    artistMainLinkFormatted () {
      return formatArtistMainLink({
        artistName: this.artistName
      })
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
