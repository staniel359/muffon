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
import deleteProfileFavorite
  from '*/helpers/actions/api/profile/favorites/model/delete'
import createProfileFavoriteArtist
  from '*/helpers/actions/api/profile/favorites/artist/create'
import createProfileFavoriteAlbum
  from '*/helpers/actions/api/profile/favorites/album/create'
import createProfileFavoriteTrack
  from '*/helpers/actions/api/profile/favorites/track/create'

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
        this.deleteProfileFavorite(
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
    deleteProfileFavorite,
    createProfileFavoriteArtist,
    createProfileFavoriteAlbum,
    createProfileFavoriteTrack,
    createFavorite () {
      switch (this.model) {
        case 'artist':
          return this.createProfileFavoriteArtist(
            this.artistCreateArgs
          )
        case 'album':
          return this.createProfileFavoriteAlbum(
            this.albumCreateArgs
          )
        case 'track':
          return this.createProfileFavoriteTrack(
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
