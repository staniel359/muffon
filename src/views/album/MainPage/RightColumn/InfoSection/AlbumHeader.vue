<template>
  <div class="album-header">
    <BaseHeader
      tag="h2"
      :text="albumTitle"
    />

    <BaseHeaderContainer tag="h3">
      <BaseLink
        :link="artistMainLinkFormatted"
        :text="artistName"
      />
    </BaseHeaderContainer>
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseLink from '@/BaseLink.vue'
import { artistMain as formatArtistMainLink } from '#/formatters/links'

export default {
  name: 'AlbumHeader',
  components: {
    BaseHeader,
    BaseHeaderContainer,
    BaseLink
  },
  props: {
    artistName: {
      type: String,
      required: true
    },
    albumTitle: {
      type: String,
      required: true
    }
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
.album-header
  margin-bottom: 10px
</style>
