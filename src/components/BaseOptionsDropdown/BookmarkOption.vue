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
      class="bookmark icon"
    ></i>

    {{ textFormatted }}
  </div>
</template>

<script>
import deleteData from '#/actions/api/profile/bookmarks/model/deleteData'
import postArtistData from '#/actions/api/profile/bookmarks/artists/postData'
import postAlbumData from '#/actions/api/profile/bookmarks/albums/postData'
import postTrackData from '#/actions/api/profile/bookmarks/tracks/postData'

export default {
  name: 'BookmarkOption',
  inject: [
    'setBookmarkId'
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
          'shared.bookmarks.delete'
        )
      } else {
        return this.$t(
          'shared.bookmarks.add'
        )
      }
    }
  },
  methods: {
    handleClick () {
      if (this.optionModelId) {
        this.deleteBookmark()
      } else {
        this.createBookmark()
      }
    },
    deleteData,
    postArtistData,
    postAlbumData,
    postTrackData,
    deleteBookmark () {
      this.deleteData({
        model: this.model,
        bookmarkId: this.optionModelId
      })
    },
    createBookmark () {
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
