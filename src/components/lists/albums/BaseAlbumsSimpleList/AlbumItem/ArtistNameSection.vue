<template>
  <span
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <BaseArtistLinks
      :artists="artists"
    />
  </span>
</template>

<script>
import BaseArtistLinks from '*/components/links/BaseArtistLinks.vue'

export default {
  name: 'ArtistNameSection',
  components: {
    BaseArtistLinks
  },
  props: {
    artists: Array
  },
  emits: [
    'activeChange'
  ],
  methods: {
    handleMouseEnter () {
      this.$emit(
        'activeChange',
        true
      )
    },
    handleMouseLeave () {
      this.$emit(
        'activeChange',
        false
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
