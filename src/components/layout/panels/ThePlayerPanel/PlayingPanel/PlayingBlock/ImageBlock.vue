<template>
  <BaseImage
    v-if="isFromSource"
    model="track"
    class="rounded bordered playing-image"
    :image="imageData?.[size]"
  />
  <BaseArtistImage
    v-else
    class="circular bordered playing-image"
    :artist-name="artistName"
    :size="size"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseArtistImage from '*/components/models/artist/BaseArtistImage.vue'

export default {
  name: 'ImageBlock',
  components: {
    BaseImage,
    BaseArtistImage
  },
  data () {
    return {
      size: 'extrasmall'
    }
  },
  computed: {
    ...mapState(
      'player',
      {
        playerPlaying: 'playing'
      }
    ),
    isFromSource () {
      return !!this.playerPlaying.from_source
    },
    imageData () {
      return this.playerPlaying.image
    },
    artistName () {
      return this.playerPlaying.artist.name
    }
  }
}
</script>

<style lang="sass" scoped>
.playing-image
  width: 40px
  height: 40px
  margin-right: 0.5em !important
</style>
