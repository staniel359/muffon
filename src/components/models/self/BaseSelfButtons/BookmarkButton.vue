<template>
  <div>
    <BaseButton
      v-if="bookmarkId"
      class="green fluid"
      icon="bookmark"
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
      icon="bookmark"
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
import postArtistData from '#/actions/api/profile/bookmarks/artists/postData'
import postAlbumData from '#/actions/api/profile/bookmarks/albums/postData'
import postTrackData from '#/actions/api/profile/bookmarks/tracks/postData'
import deleteBookmarkData
  from '#/actions/api/profile/bookmarks/model/deleteData'

export default {
  name: 'BookmarkButton',
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
      bookmarkId: null,
      isError: false,
      isLoading: false
    }
  },
  computed: {
    deleteFormatted () {
      return this.$t(
        'shared.bookmarks.added'
      )
    },
    addFormatted () {
      return this.$t(
        'shared.bookmarks.add'
      )
    }
  },
  mounted () {
    this.bookmarkId = this.modelId
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
      return this.deleteBookmarkData({
        model: this.model,
        bookmarkId: this.bookmarkId
      }).then(this.handleSuccess)
    },
    handleSuccess () {
      this.bookmarkId = null
    },
    postArtistData,
    postAlbumData,
    postTrackData,
    deleteBookmarkData
  }
}
</script>

<style lang="sass" scoped></style>
