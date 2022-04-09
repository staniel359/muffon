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
import deleteFavorite from '*/helpers/actions/api/favorite/model/delete'
import createFavoriteArtist from '*/helpers/actions/api/favorite/artist/create'
import createFavoriteAlbum from '*/helpers/actions/api/favorite/album/create'
import createFavoriteTrack from '*/helpers/actions/api/favorite/track/create'

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
      return this.$t(
        `actions.${this.favoriteTextKey}.favorites`
      )
    },
    favoriteTextKey () {
      return this.modelId
        ? 'deleteFrom'
        : 'addTo'
    },
    artistCreateArgs () {
      return {
        artistName: this.artistName
      }
    },
    albumCreateArgs () {
      return {
        albumTitle: this.albumTitle,
        artistName: this.artistName,
        imageUrl: this.imageUrl
      }
    },
    trackCreateArgs () {
      return {
        trackTitle: this.trackTitle,
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        imageUrl: this.imageUrl
      }
    },
    deleteArgs () {
      return {
        model: this.model,
        favoriteId: this.modelId
      }
    }
  },
  methods: {
    handleClick () {
      if (this.modelId) {
        this.deleteFavorite(
          this.deleteArgs
        ).then(
          this.handleDeleteSuccess
        )
      } else {
        this.createFavorite().then(
          this.handleCreateSuccess
        )
      }
    },
    handleCreateSuccess (response) {
      const favoriteId =
        response.data.favorite_id.toString()

      this.setFavoriteId(
        favoriteId
      )
    },
    handleDeleteSuccess () {
      this.setFavoriteId(null)
    },
    deleteFavorite,
    createFavoriteArtist,
    createFavoriteAlbum,
    createFavoriteTrack,
    createFavorite () {
      switch (this.model) {
        case 'artist':
          return this.createFavoriteArtist(
            this.artistCreateArgs
          )
        case 'album':
          return this.createFavoriteAlbum(
            this.albumCreateArgs
          )
        case 'track':
          return this.createFavoriteTrack(
            this.trackCreateArgs
          )
        default:
          return null
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
