<template>
  <BaseImage
    v-if="isWithAlbum"
    model="track"
    class="rounded rounded-small bordered medium"
    :image="imageData?.[size]"
  />
  <BaseArtistImage
    v-else
    :key="key"
    class="medium"
    :artist-name="artistName"
    :size="size"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseArtistImage from '@/components/models/artist/BaseArtistImage.vue'
import {
  isStringChanged,
  generateKey
} from '@/helpers/utils'

export default {
  name: 'ImageBlock',
  components: {
    BaseImage,
    BaseArtistImage
  },
  data () {
    return {
      key: null,
      size: 'extrasmall'
    }
  },
  computed: {
    ...mapState(
      'player',
      {
        playerPlaying: 'playing',
        isPlayerWithAlbum: 'isWithAlbum'
      }
    ),
    isWithAlbum () {
      return (
        this.isPlayerWithAlbum ||
          this.isFromSource
      )
    },
    isFromSource () {
      return !!this.playerPlaying.from_source
    },
    imageData () {
      return this.playerPlaying.image
    },
    artistName () {
      return this.playerPlaying?.artist?.name
    }
  },
  watch: {
    artistName: 'handleArtistNameChange'
  },
  methods: {
    handleArtistNameChange (
      newValue,
      oldValue
    ) {
      if (newValue) {
        const isChanged =
          isStringChanged(
            newValue,
            oldValue
          )

        if (
          !this.isFromSource &&
            isChanged
        ) {
          this.key = generateKey()
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
