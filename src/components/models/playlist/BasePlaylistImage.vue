<template>
  <BaseImage
    class="rounded bordered main-playlist-image"
    :image="imageFormatted"
  />
</template>

<script>
import BaseImage from '@/BaseImage.vue'

export default {
  name: 'BasePlaylistImage',
  components: {
    BaseImage
  },
  props: {
    image: String
  },
  data () {
    return {
      defaultImage:
        'https://lastfm.freetls.fastly.net/i/u/300x300' +
        '/4128a6eb29f94943c9d206c08e625904.png'
    }
  },
  computed: {
    imageFormatted () {
      return (
        this.image ||
          this.defaultImage
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
