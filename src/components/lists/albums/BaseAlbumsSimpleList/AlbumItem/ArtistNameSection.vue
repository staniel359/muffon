<template>
  <span
    :class="{ link: isArtistNameActive }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    {{ artistName }}
  </span>
</template>

<script>
export default {
  name: 'ArtistNameSection',
  props: {
    artistName: {
      type: String,
      required: true
    },
    isArtistNameActive: Boolean
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
