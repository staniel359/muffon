<template>
  <BaseHeaderContainer
    class="artists-section"
    tag="h4"
  >
    <BaseArtistLinks
      :artists="artists"
    />
  </BaseHeaderContainer>
</template>

<script>
import BaseHeaderContainer
  from '@/components/containers/BaseHeaderContainer.vue'
import BaseArtistLinks from '@/components/links/BaseArtistLinks.vue'

export default {
  name: 'ArtistsSection',
  components: {
    BaseHeaderContainer,
    BaseArtistLinks
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  computed: {
    artists () {
      return this.trackData.artists
    }
  }
}
</script>

<style lang="sass" scoped>
.artists-section
  @extend .text-medium-light
  margin-top: 0.15em !important
</style>
