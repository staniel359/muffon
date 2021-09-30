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
      class="check icon"
    ></i>

    {{ textFormatted }}
  </div>
</template>

<script>
import deleteData from '#/actions/api/profile/listened/model/deleteData'
import postArtistData from '#/actions/api/profile/listened/artists/postData'
import postAlbumData from '#/actions/api/profile/listened/albums/postData'
import postTrackData from '#/actions/api/profile/listened/tracks/postData'

export default {
  name: 'ListenedOption',
  inject: [
    'setListenedId'
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
          'shared.listened.delete'
        )
      } else {
        return this.$t(
          'shared.listened.add'
        )
      }
    }
  },
  methods: {
    handleClick () {
      if (this.optionModelId) {
        this.deleteListened()
      } else {
        this.createListened()
      }
    },
    deleteData,
    postArtistData,
    postAlbumData,
    postTrackData,
    deleteListened () {
      this.deleteData({
        model: this.model,
        listenedId: this.optionModelId
      })
    },
    createListened () {
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
