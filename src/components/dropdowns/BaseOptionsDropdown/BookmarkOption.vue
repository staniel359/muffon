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
      class="bookmark icon"
    ></i>

    {{ bookmarkText }}
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
    bookmarkText () {
      if (this.modelId) {
        return this.$t(
          'shared.bookmarks.delete'
        )
      } else {
        return this.$t(
          'shared.bookmarks.add'
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
        artistName: this.artistName,
        imageUrl: this.imageUrl
      }
    },
    trackParams () {
      return {
        trackTitle: this.trackTitle,
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        imageUrl: this.imageUrl
      }
    }
  },
  methods: {
    handleClick () {
      if (this.modelId) {
        this.deleteBookmark()
      } else {
        const handleSuccess = response => {
          const bookmarkId =
            response.data.bookmark_id.toString()

          this.setBookmarkId(
            bookmarkId
          )
        }

        this.createBookmark()
          .then(handleSuccess)
      }
    },
    deleteData,
    postArtistData,
    postAlbumData,
    postTrackData,
    deleteBookmark () {
      const handleSuccess = response => {
        this.setBookmarkId(null)
      }

      this.deleteData({
        model: this.model,
        bookmarkId: this.modelId
      }).then(handleSuccess)
    },
    createBookmark () {
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
