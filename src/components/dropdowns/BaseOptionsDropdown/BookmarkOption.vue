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
import deleteBookmark from '*/helpers/actions/api/bookmarks/model/delete'
import createBookmarkArtist
  from '*/helpers/actions/api/bookmarks/artist/create'
import createBookmarkAlbum from '*/helpers/actions/api/bookmarks/album/create'
import createBookmarkTrack from '*/helpers/actions/api/bookmarks/track/create'

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
      return this.$t(
        `actions.${this.bookmarkTextKey}.bookmarks`
      )
    },
    bookmarkTextKey () {
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
        bookmarkId: this.modelId
      }
    }
  },
  methods: {
    handleClick () {
      if (this.modelId) {
        this.deleteBookmark(
          this.deleteArgs
        ).then(
          this.handleDeleteSuccess
        )
      } else {
        this.createBookmark().then(
          this.handleCreateSuccess
        )
      }
    },
    handleCreateSuccess (response) {
      const bookmarkId =
        response.data.bookmark_id.toString()

      this.setBookmarkId(
        bookmarkId
      )
    },
    handleDeleteSuccess () {
      this.setBookmarkId(null)
    },
    deleteBookmark,
    createBookmarkArtist,
    createBookmarkAlbum,
    createBookmarkTrack,
    createBookmark () {
      switch (this.model) {
        case 'artist':
          return this.createBookmarkArtist(
            this.artistCreateArgs
          )
        case 'album':
          return this.createBookmarkAlbum(
            this.albumCreateArgs
          )
        case 'track':
          return this.createBookmarkTrack(
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
