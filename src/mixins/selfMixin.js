import {
  isCurrentProfile
} from '*/helpers/utils'

export default {
  provide () {
    return {
      setLibraryId: this.setLibraryId,
      setFavoriteId: this.setFavoriteId,
      setBookmarkId: this.setBookmarkId,
      setListenedId: this.setListenedId
    }
  },
  data () {
    return {
      libraryId: null,
      favoriteId: null,
      bookmarkId: null,
      listenedId: null
    }
  },
  computed: {
    isWithLibraryIcon () {
      return !(
        this.isLinkToLibrary &&
          this.isSelf
      )
    },
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    },
    isWithFavoriteIcon () {
      return !(
        this.isFavorite &&
          this.isSelf
      )
    },
    isWithBookmarkIcon () {
      return !this.isBookmark
    }
  },
  mounted () {
    this.setSelfData()
  },
  methods: {
    setSelfData () {
      const libraryId =
        this.modelData
          .library_id
          ?.toString()

      const favoriteId =
        this.modelData
          .favorite_id
          ?.toString()

      const bookmarkId =
        this.modelData
          .bookmark_id
          ?.toString()

      const listenedId =
        this.modelData
          .listened_id
          ?.toString()

      this.setLibraryId(
        libraryId
      )

      this.setFavoriteId(
        favoriteId
      )

      this.setBookmarkId(
        bookmarkId
      )

      this.setListenedId(
        listenedId
      )
    },
    setLibraryId (
      value
    ) {
      this.libraryId = value
    },
    setFavoriteId (
      value
    ) {
      this.favoriteId = value
    },
    setBookmarkId (
      value
    ) {
      this.bookmarkId = value
    },
    setListenedId (
      value
    ) {
      this.listenedId = value
    }
  }
}
