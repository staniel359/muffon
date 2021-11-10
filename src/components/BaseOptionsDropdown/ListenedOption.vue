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
    artistName: String,
    albumTitle: String,
    trackTitle: String
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    textFormatted () {
      if (this.modelId) {
        return this.$t(
          'shared.listened.delete'
        )
      } else {
        return this.$t(
          'shared.listened.add'
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
        artistName: this.artistName
      }
    },
    trackParams () {
      return {
        trackTitle: this.trackTitle,
        artistName: this.artistName
      }
    }
  },
  methods: {
    handleClick () {
      if (this.modelId) {
        this.deleteListened()
      } else {
        const handleSuccess = response => {
          const listenedId =
            response.data.listened_id.toString()

          this.setListenedId(
            listenedId
          )
        }

        this.createListened()
          .then(handleSuccess)
      }
    },
    deleteData,
    postArtistData,
    postAlbumData,
    postTrackData,
    deleteListened () {
      const handleSuccess = response => {
        this.setListenedId(null)
      }

      this.deleteData({
        model: this.model,
        listenedId: this.modelId
      }).then(handleSuccess)
    },
    createListened () {
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
