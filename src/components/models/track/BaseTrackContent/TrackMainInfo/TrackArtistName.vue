<template>
  <BaseArtistLinks
    :artists="artists"
    :artistName="artistName"
    @linkClick="handleLinkClick"
  />
</template>

<script>
import BaseArtistLinks from '@/BaseArtistLinks.vue'

export default {
  name: 'TrackArtistName',
  components: {
    BaseArtistLinks
  },
  props: {
    artists: Array,
    artistName: String
  },
  emits: [
    'linkClick'
  ],
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped></style>
