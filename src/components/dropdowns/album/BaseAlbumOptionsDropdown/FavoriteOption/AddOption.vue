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
import createFavoriteAlbum from '@/helpers/actions/api/favorite/album/create'

export default {
  name: 'AddOption',
  components: {
    BaseFavoriteOption
  },
  inject: [
    'setFavoriteId'
  ],
  props: {
    albumData: {
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
        albumTitle: this.albumTitle,
        imageUrl: this.imageUrl
      }
    },
    artistName () {
      return this.albumData.artist.name
    },
    albumTitle () {
      return this.albumData.title
    },
    imageUrl () {
      return this.albumData.image?.large
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    createFavoriteAlbum,
    handleClick () {
      this.createFavoriteAlbum(
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
