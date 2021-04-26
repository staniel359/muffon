<template>
  <a
    class="ui main-link"
    href=""
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    {{ artistName }}
  </a>
  <br>
</template>

<script>
export default {
  name: 'ArtistName',
  inject: [
    'setIsArtistNameActive'
  ],
  props: {
    artistName: {
      type: String,
      required: true
    }
  },
  methods: {
    handleMouseEnter () {
      this.setIsArtistNameActive(true)
    },
    handleMouseLeave () {
      this.setIsArtistNameActive(false)
    }
  }
}
</script>

<style lang="sass" scoped></style>
