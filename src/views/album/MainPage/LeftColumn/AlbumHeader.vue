<template>
  <BaseTransitionContainer
    class="album-full-title"
    :scrollable="scrollable"
  >
    <h3 class="ui header main-header">
      {{ albumTitle }}
    </h3>
    <h4 class="ui header main-header">
      <RouterLink
        class="main-link"
        :to="artistMainLinkFormatted"
      >
        {{ artistName }}
      </RouterLink>
    </h4>
  </BaseTransitionContainer>
</template>

<script>
import BaseTransitionContainer from '@/containers/BaseTransitionContainer.vue'
import { artistMain as formatArtistMainLink } from '#/formatters/links'

export default {
  name: 'AlbumHeader',
  components: {
    BaseTransitionContainer
  },
  props: {
    albumTitle: {
      type: String,
      required: true
    },
    artistName: {
      type: String,
      required: true
    },
    scrollable: HTMLDivElement
  },
  computed: {
    artistMainLinkFormatted () {
      return formatArtistMainLink({
        artistName: this.artistName
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.album-full-title
  @extend .text-align-center
  margin: 10px 0
</style>
