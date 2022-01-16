<template>
  <img
    class="ui image main-image"
    :class="{ inverted: isDarkMode }"
    :[attribute]="imageConditional"
    @click="handleClick"
  />
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseImage',
  props: {
    image: String,
    model: String,
    isLazy: Boolean
  },
  emits: [
    'click'
  ],
  data () {
    return {
      defaultImages: {
        artist: 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png',
        album: 'https://lastfm.freetls.fastly.net/i/u/300x300/c6f59c1e5e7240a4c0d427abd71f3dbb.png',
        track: 'https://lastfm.freetls.fastly.net/i/u/300x300/4128a6eb29f94943c9d206c08e625904.png',
        playlist: 'https://lastfm.freetls.fastly.net/i/u/300x300/4128a6eb29f94943c9d206c08e625904.png',
        profile: 'https://lastfm.freetls.fastly.net/i/u/300x300/818148bf682d429dc215c1705eb27b98.png',
        community: 'https://lastfm.freetls.fastly.net/i/u/300x300/818148bf682d429dc215c1705eb27b98.png',
        video: 'https://i.ytimg.com'
      }
    }
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    attribute () {
      return this.isLazy
        ? 'data-lazy'
        : 'src'
    },
    imageConditional () {
      return (
        this.image ||
          this.defaultImage
      )
    },
    defaultImage () {
      return this.defaultImages[
        this.model
      ]
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped></style>
