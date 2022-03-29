<template>
  <BaseImage
    v-if="isWithImage"
    model="track"
    class="rounded bordered playing-image"
    :image="imageData?.[size]"
  />
  <BaseArtistImage
    v-else
    class="circular bordered playing-image"
    :artistName="artistName"
    :size="size"
  />
</template>

<script>
import { mapState } from 'vuex'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseArtistImage from '*/components/models/artist/BaseArtistImage.vue'
import { artistName as formatArtistName } from '*/helpers/formatters'

export default {
  name: 'ImageBlock',
  components: {
    BaseImage,
    BaseArtistImage
  },
  props: {
    isWithImage: Boolean
  },
  data () {
    return {
      size: 'extrasmall'
    }
  },
  computed: {
    ...mapState('player', {
      playerPlaying: 'playing'
    }),
    imageData () {
      return this.playerPlaying.image
    },
    artistName () {
      return formatArtistName(
        this.artists
      )
    },
    artists () {
      return this.playerPlaying.artists
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
