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
import deleteFavorite from '#/actions/api/favorites/model/delete'
import createFavoriteArtist from '#/actions/api/favorites/artist/create'
import createFavoriteAlbum from '#/actions/api/favorites/album/create'
import createFavoriteTrack from '#/actions/api/favorites/track/create'

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
