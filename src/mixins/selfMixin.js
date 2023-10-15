import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  provide () {
    return {
      setLibraryId:
        this.setLibraryId,
      setFavoriteId:
        this.setFavoriteId,
      setBookmarkId:
        this.setBookmarkId,
      setListenedId:
        this.setListenedId,
      setWatchedId:
        this.setWatchedId
    }
  },
  props: {
    isCompatibility: Boolean
  },
  data () {
    return {
      libraryId: null,
      favoriteId: null,
      bookmarkId: null,
      listenedId: null,
      watchedId: null
    }
  },
  computed: {
    isWithLibraryIcon () {
      return !(
        this.isCompatibility || (
          this.isLinkToLibrary &&
          this.isSelf
        )
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

      const watchedId =
        this.modelData
          .watched_id
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

      this.setWatchedId(
        watchedId
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
    },
    setWatchedId (
      value
    ) {
      this.watchedId = value
    }
  }
}
