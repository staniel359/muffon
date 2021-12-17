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

    {{ listenedText }}
  </div>
</template>

<script>
import deleteListened from '#/actions/api/listened/model/delete'
import createListenedArtist from '#/actions/api/listened/artist/create'
import createListenedAlbum from '#/actions/api/listened/album/create'
import createListenedTrack from '#/actions/api/listened/track/create'

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
    listenedText () {
      return this.$t(
        `actions.${this.listenedTextKey}.listened`
      )
    },
    listenedTextKey () {
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
        artistName: this.artistName
      }
    },
    trackCreateArgs () {
      return {
        trackTitle: this.trackTitle,
        artistName: this.artistName
      }
    },
    deleteArgs () {
      return {
        model: this.model,
        listenedId: this.modelId
      }
    }
  },
  methods: {
    handleClick () {
      if (this.modelId) {
        this.deleteListened(
          this.deleteArgs
        ).then(
          this.handleDeleteSuccess
        )
      } else {
        this.createListened().then(
          this.handleCreateSuccess
        )
      }
    },
    handleCreateSuccess (response) {
      const listenedId =
        response.data.listened_id.toString()

      this.setListenedId(
        listenedId
      )
    },
    handleDeleteSuccess () {
      this.setListenedId(null)
    },
    deleteListened,
    createListenedArtist,
    createListenedAlbum,
    createListenedTrack,
    createListened () {
      switch (this.model) {
        case 'artist':
          return this.createListenedArtist(
            this.artistCreateArgs
          )
        case 'album':
          return this.createListenedAlbum(
            this.albumCreateArgs
          )
        case 'track':
          return this.createListenedTrack(
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
