<template>
  <BaseFavoriteOption
    action="add"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseFavoriteOption from '../options/BaseFavoriteOption.vue'
import createFavoriteArtist from '*/helpers/actions/api/favorite/artist/create'

export default {
  name: 'ArtistOption',
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
        artistName: this.artistName
      }
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    createFavoriteArtist,
    handleClick () {
      this.createFavoriteArtist(
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
