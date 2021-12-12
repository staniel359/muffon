<template>
  <div
    class="item"
    :class="{ disabled: isLoading }"
    @click.prevent="handleClick"
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

    {{ favoriteText }}
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
    artistName: String,
    albumTitle: String,
    trackTitle: String,
    imageUrl: String
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    favoriteText () {
      if (this.modelId) {
        return this.$t(
          'shared.favorites.delete'
        )
      } else {
        return this.$t(
          'shared.favorites.add'
        )
      }
    },
    artistParams () {
      return {
        artistName: this.artistName
      }
    },
    albumParams () {
      return {
        albumTitle: this.albumTitle,
        artistName: this.artistName,
        imageUrl: this.imageUrl
      }
    },
    trackParams () {
      return {
        trackTitle: this.trackTitle,
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        imageUrl: this.imageUrl
      }
    }
  },
  methods: {
    handleClick () {
      if (this.modelId) {
        this.deleteFavorite()
      } else {
        const handleSuccess = response => {
          const favoriteId =
            response.data.favorite_id.toString()

          this.setFavoriteId(
            favoriteId
          )
        }

        this.createFavorite()
          .then(handleSuccess)
      }
    },
    deleteData,
    postArtistData,
    postAlbumData,
    postTrackData,
    deleteFavorite () {
      const handleSuccess = response => {
        this.setFavoriteId(null)
      }

      this.deleteData({
        model: this.model,
        favoriteId: this.modelId
      }).then(handleSuccess)
    },
    createFavorite () {
      switch (this.model) {
        case 'artist':
          return this.postArtistData(
            this.artistParams
          )
        case 'album':
          return this.postAlbumData(
            this.albumParams
          )
        case 'track':
          return this.postTrackData(
            this.trackParams
          )
        default:
          return null
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
