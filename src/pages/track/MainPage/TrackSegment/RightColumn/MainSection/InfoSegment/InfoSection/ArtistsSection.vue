<template>
  <div class="extra">
    <BaseArtistLinks
      :artists="artists"
    />
  </div>
</template>

<script>
import BaseArtistLinks from '@/components/links/BaseArtistLinks.vue'

export default {
  name: 'ArtistsSection',
  components: {
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

<style lang="sass" scoped></style>
