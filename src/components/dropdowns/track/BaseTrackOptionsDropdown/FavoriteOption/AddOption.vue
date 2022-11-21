<template>
  <BaseFavoriteOption
    action="add"
    :is-loading="isLoading"
    :is-error="isError"
    @click="handleClick"
  />
</template>

<script>
import BaseFavoriteOption
  from '@/components/dropdowns/options/favorite/BaseFavoriteOption.vue'
import createFavoriteTrack from '@/helpers/actions/api/favorite/track/create'

export default {
  name: 'AddOption',
  components: {
    BaseFavoriteOption
  },
  inject: [
    'setFavoriteId'
  ],
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      favoriteId: null,
      isLoading: false,
      isError: false,
      isSuccess: false
    }
  },
  computed: {
    createArgs () {
      return {
        artistName: this.artistName,
        trackTitle: this.trackTitle,
        albumTitle: this.albumTitle,
        imageUrl: this.imageUrl,
        sourceData: this.sourceData,
        audioData:
          this.audioDataFormatted,
        albumSourceData:
          this.albumSourceData
      }
    },
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    },
    albumTitle () {
      return this.albumData?.title
    },
    albumData () {
      return this.trackData.album
    },
    imageUrl () {
      return this.trackData.image?.large
    },
    sourceData () {
      return this.trackData.source
    },
    audioDataFormatted () {
      return this.audioData && {
        present: this.audioData.present
      }
    },
    audioData () {
      return this.trackData.audio
    },
    albumSourceData () {
      return this.albumData?.source
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    createFavoriteTrack,
    handleClick () {
      this.createFavoriteTrack(
        this.createArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.setFavoriteId(
          this.favoriteId
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
