<template>
  <div>
    <BaseArtistLinks
      :artists="artists"
      :isLinkToLibrary="isLinkToLibrary"
      :profileId="profileId"
      @linkClick="handleLinkClick"
    />
  </div>
</template>

<script>
import BaseArtistLinks from '*/components/links/BaseArtistLinks.vue'

export default {
  name: 'TrackArtistName',
  components: {
    BaseArtistLinks
  },
  props: {
    artists: Array,
    isLinkToLibrary: Boolean,
    profileId: String
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
