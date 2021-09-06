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
import deleteListenedData
  from '#/actions/api/profile/listened/model/deleteData'

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
      return this.$t(
        'shared.listened.added'
      )
    },
    addFormatted () {
      return this.$t(
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
      return this.deleteListenedData({
        model: this.model,
        listenedId: this.listenedId
      })
    },
    postArtistData,
    postAlbumData,
    postTrackData,
    deleteListenedData
  }
}
</script>

<style lang="sass" scoped></style>
