<template>
  <RouterLink
    class="ui card main-card-light"
    :to="artistMainLinkFormatted"
  >
    <div></div>
    <div class="image-container main-image-container">
      <BaseImage
        :image="image"
        isCircular
        isBordered
      />
    </div>

    <div class="content">
      <h4
        v-if="isSmall"
        class="ui header link-active"
      >
        {{ artistName }}
      </h4>
      <h3
        v-else
        class="ui header main-header link-active"
      >
        {{ artistName }}
      </h3>

      <template v-if="isWithListenersCount">
        {{ listenersCountFormatted }}
      </template>
    </div>
  </RouterLink>
</template>

<script>
import BaseImage from '@/BaseImage.vue'
import { artistMain as formatArtistMainLink } from '#/formatters/links'
import { listenersCount as listenersCountDecorated } from '#/decorators'

export default {
  name: 'ArtistItem',
  components: {
    BaseImage
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    isSmall: Boolean,
    isWithListenersCount: Boolean
  },
  computed: {
    artistName () {
      return this.artistData.name
    },
    image () {
      return this.artistData.image.small
    },
    listenersCount () {
      return this.artistData.listeners_count || 0
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
  }
}
</script>

<style lang="sass" scoped></style>
