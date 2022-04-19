<template>
  <BaseFavoriteOption
    action="add"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseFavoriteOption from '../options/BaseFavoriteOption.vue'
import createFavoriteTrack from '*/helpers/actions/api/favorite/track/create'

export default {
  name: 'TrackOption',
  components: {
    BaseFavoriteOption
  },
  inject: [
    'setFavoriteId'
  ],
  props: {
    artistName: {
      type: String,
      required: true
    },
    trackTitle: {
      type: String,
      required: true
    },
    albumTitle: String,
    imageUrl: String
  },
  data () {
    return {
      favoriteId: null,
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    createArgs () {
      return {
        artistName: this.artistName,
        trackTitle: this.trackTitle,
        albumTitle: this.albumTitle,
        imageUrl: this.imageUrl
      }
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
