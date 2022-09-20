<template>
  <BaseFavoriteOption
    action="add"
    :is-loading="isLoading"
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
    },
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    },
    albumTitle () {
      return this.trackData.album?.title
    },
    imageUrl () {
      return this.trackData.image?.large
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
