<template>
  <div>
    <BaseArtistLinks
      :artists="artists"
      :artistName="artistName"
      :isLinkToLibrary="isLinkToLibrary"
      :profileId="profileId"
      :artistId="artistId"
      @linkClick="handleLinkClick"
    />
  </div>
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
    artistName: String,
    isLinkToLibrary: Boolean,
    profileId: String,
    artistId: String
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
