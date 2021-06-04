<template>
  <BaseTransitionContainer
    class="album-full-title transition hidden"
    :scrollable="scrollable"
  >
    <BaseHeader
      tag="h3"
      :text="albumTitle"
    />

    <BaseHeaderContainer tag="h4">
      <BaseLink
        :link="artistMainLinkFormatted"
        :text="artistName"
      />
    </BaseHeaderContainer>
  </BaseTransitionContainer>
</template>

<script>
import BaseTransitionContainer from '@/containers/BaseTransitionContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseLink from '@/BaseLink.vue'
import { artistMain as formatArtistMainLink } from '#/formatters/links'

export default {
  name: 'AlbumHeader',
  components: {
    BaseTransitionContainer,
    BaseHeader,
    BaseHeaderContainer,
    BaseLink
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
