<template>
  <div
    class="item"
    :class="{ disabled: isLoading }"
    @click="handleClick"
  >
    <i
      v-if="isLoading"
      class="icon"
    >
      <div class="ui mini active inline loader"></div>
    </i>
    <i
      v-else
      class="star icon"
    ></i>

    {{ textFormatted }}
  </div>
</template>

<script>
import deleteData from '#/actions/api/profile/favorites/model/deleteData'
import postArtistData from '#/actions/api/profile/favorites/artists/postData'
import postAlbumData from '#/actions/api/profile/favorites/albums/postData'
import postTrackData from '#/actions/api/profile/favorites/tracks/postData'

export default {
  name: 'FavoriteOption',
  inject: [
    'setFavoriteId'
  ],
  props: {
    model: {
      type: String,
      required: true
    },
    modelId: String,
    optionModelId: String,
    albumTitle: String,
    imageUrl: String
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    textFormatted () {
      if (this.optionModelId) {
        return this.$t(
          'shared.favorites.delete'
        )
      } else {
        return this.$t(
          'shared.favorites.add'
        )
      }
    }
  },
  methods: {
    handleClick () {
      if (this.optionModelId) {
        this.deleteFavorite()
      } else {
        this.createFavorite()
      }
    },
    deleteData,
    postArtistData,
    postAlbumData,
    postTrackData,
    deleteFavorite () {
      this.deleteData({
        model: this.model,
        favoriteId: this.optionModelId
      })
    },
    createFavorite () {
      switch (this.model) {
        case 'artist':
          return this.postArtistData({
            artistId: this.modelId
          })
        case 'album':
          return this.postAlbumData({
            albumId: this.modelId,
            imageUrl: this.imageUrl
          })
        case 'track':
          return this.postTrackData({
            trackId: this.modelId,
            albumTitle: this.albumTitle,
            imageUrl: this.imageUrl
          })
        default:
          return null
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
