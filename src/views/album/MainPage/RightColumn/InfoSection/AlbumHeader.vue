<template>
  <div class="album-header">
    <BaseHeaderContainer tag="h2">
      {{ albumTitle }}

      <span
        v-if="albumExtraTitle"
        class="sub header main-extra-title"
      >
        {{ albumExtraTitle }}
      </span>
    </BaseHeaderContainer>

    <BaseHeaderContainer tag="h3">
      <BaseLink
        :link="artistMainLinkFormatted"
        :text="artistName"
      />
    </BaseHeaderContainer>
  </div>
</template>

<script>
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseLink from '@/BaseLink.vue'
import { artistMain as formatArtistMainLink } from '#/formatters/links'

export default {
  name: 'AlbumHeader',
  components: {
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
    albumExtraTitle: String
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
