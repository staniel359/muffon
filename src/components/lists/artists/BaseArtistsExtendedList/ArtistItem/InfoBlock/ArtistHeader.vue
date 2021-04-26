<template>
  <BaseHeaderContainer tag="h2">
    <BaseLink
      :link="artistMainLinkFormatted"
      :text="artistName"
    />
  </BaseHeaderContainer>
</template>

<script>
import BaseHeaderContainer from '@/containers/BaseHeaderContainer.vue'
import BaseLink from '@/BaseLink.vue'
import { artistMain as formatArtistMainLink } from '#/formatters/links'

export default {
  name: 'ArtistHeader',
  components: {
    BaseHeaderContainer,
    BaseLink
  },
  props: {
    artistName: {
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
.main-header
  margin-bottom: 5px !important
</style>
