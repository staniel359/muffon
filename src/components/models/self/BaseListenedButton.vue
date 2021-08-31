<template>
  <div>
    <BaseButton
      v-if="listenedId"
      class="green fluid"
      icon="check"
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
      icon="check"
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
import postArtistData from '#/actions/api/profile/listened/artists/postData'
import postAlbumData from '#/actions/api/profile/listened/albums/postData'
import postTrackData from '#/actions/api/profile/listened/tracks/postData'
import deleteArtistData
  from '#/actions/api/profile/listened/artist/deleteData'
import deleteAlbumData from '#/actions/api/profile/listened/album/deleteData'
import deleteTrackData from '#/actions/api/profile/listened/track/deleteData'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'BaseListenedButton',
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
    albumImageUrl: String,
    trackTitle: String
  },
  data () {
    return {
      listenedId: null,
      isError: false,
      isLoading: false
    }
  },
  computed: {
    deleteFormatted () {
      return localize(
        'shared.listened.added'
      )
    },
    addFormatted () {
      return localize(
        'shared.listened.add'
      )
    }
  },
  mounted () {
    this.listenedId = this.modelId
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
            imageUrl: this.albumImageUrl
          })
        case 'track':
          return this.postTrackData({
            title: this.trackTitle,
            artistName: this.artistName
          })
        default:
          return null
      }
    },
    handleDeleteButtonClick () {
      switch (this.model) {
        case 'artist':
          return this.deleteArtistData({
            artistId: this.listenedId
          })
        case 'album':
          return this.deleteAlbumData({
            albumId: this.listenedId
          })
        case 'track':
          return this.deleteTrackData({
            trackId: this.listenedId
          })
        default:
          return null
      }
    },
    postArtistData,
    postAlbumData,
    postTrackData,
    deleteArtistData,
    deleteAlbumData,
    deleteTrackData
  }
}
</script>

<style lang="sass" scoped></style>
