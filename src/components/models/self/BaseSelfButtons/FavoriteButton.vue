<template>
  <div>
    <BaseButton
      v-if="favoriteId"
      class="green fluid"
      icon="star"
      :class="{
        loading: isLoading,
        disabled: isLoading
      }"
      :text="deleteFormatted"
      @click="handleDeleteButtonClick"
    />
    <BaseButton
      v-else
      class="primary fluid"
      icon="star"
      :class="{
        loading: isLoading,
        disabled: isLoading
      }"
      :text="addFormatted"
      @click="handleAddButtonClick"
    />
  </div>
</template>

<script>
import BaseButton from '@/BaseButton.vue'
import postArtistData from '#/actions/api/profile/favorites/artists/postData'
import postAlbumData from '#/actions/api/profile/favorites/albums/postData'
import postTrackData from '#/actions/api/profile/favorites/tracks/postData'
import deleteFavoriteData
  from '#/actions/api/profile/favorites/model/deleteData'

export default {
  name: 'FavoriteButton',
  components: {
    BaseButton
  },
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
      favoriteId: null,
      isError: false,
      isLoading: false
    }
  },
  computed: {
    deleteFormatted () {
      return this.$t(
        'shared.favorites.added'
      )
    },
    addFormatted () {
      return this.$t(
        'shared.favorites.add'
      )
    }
  },
  mounted () {
    this.favoriteId = this.modelId
  },
  methods: {
    handleAddButtonClick () {
      switch (this.model) {
        case 'artist':
          return this.postArtistData({
            artistName: this.artistName
          })
        case 'album':
          return this.postAlbumData({
            title: this.albumTitle,
            artistName: this.artistName,
            imageUrl: this.imageUrl
          })
        case 'track':
          return this.postTrackData({
            title: this.trackTitle,
            artistName: this.artistName,
            albumTitle: this.albumTitle,
            imageUrl: this.imageUrl
          })
        default:
          return null
      }
    },
    handleDeleteButtonClick () {
      return this.deleteFavoriteData({
        model: this.model,
        favoriteId: this.favoriteId
      }).then(this.handleSuccess)
    },
    handleSuccess () {
      this.favoriteId = null
    },
    postArtistData,
    postAlbumData,
    postTrackData,
    deleteFavoriteData
  }
}
</script>

<style lang="sass" scoped></style>
