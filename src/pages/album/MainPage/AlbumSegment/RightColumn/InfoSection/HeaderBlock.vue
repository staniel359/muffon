<template>
  <div class="main-top-small-section flex-full">
    <BaseHeader
      tag="h2"
      :text="albumTitle"
    />

    <BaseHeaderContainer
      class="album-artist-name text-medium-light"
      tag="h3"
    >
      <BaseArtistLinks
        :artists="artists"
      />
    </BaseHeaderContainer>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseHeaderContainer
  from '@/components/containers/BaseHeaderContainer.vue'
import BaseArtistLinks from '@/components/links/BaseArtistLinks.vue'

export default {
  name: 'HeaderBlock',
  components: {
    BaseHeader,
    BaseHeaderContainer,
    BaseArtistLinks
  },
  props: {
    albumData: {
      type: Object,
      required: true
    }
  },
  computed: {
    albumTitle () {
      return this.albumData.title
    },
    artists () {
      return this.albumData.artists
    }
  }
}
</script>

<style lang="sass" scoped>
.album-artist-name
  margin-top: 0.2rem !important
</style>
