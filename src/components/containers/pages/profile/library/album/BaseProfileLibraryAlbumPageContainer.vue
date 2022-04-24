<template>
  <BasePageContainer
    :response-data="libraryAlbumData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :library-album-data="libraryAlbumData"
      :artist-name="artistName"
      :is-loading="isLoading"
      :error="error"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatProfileLibraryAlbumPageNavigation
  from '*/helpers/formatters/navigation/profile/library/album'
import formatProfileLibraryAlbumPageTab
  from '*/helpers/formatters/tabs/profile/library/album'
import getProfileLibraryAlbum
  from '*/helpers/actions/api/profile/library/album/get'

export default {
  name: 'BaseProfileLibraryAlbumPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    },
    albumId: {
      type: String,
      required: true
    },
    scope: String,
    limit: Number
  },
  data () {
    return {
      profileData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatProfileLibraryAlbumPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        profileId: this.profileId,
        profileNickname: this.profileNickname,
        artistId: this.artistId,
        artistName: this.artistName,
        albumId: this.albumId,
        albumTitle: this.albumTitle,
        scope: this.scope
      }
    },
    tabData () {
      return formatProfileLibraryAlbumPageTab(
        this.navigationData
      )
    },
    profileNickname () {
      return this.profileData?.nickname
    },
    artistId () {
      return this.libraryAlbumArtistData?.id?.toString()
    },
    libraryAlbumArtistData () {
      return this.libraryAlbumData?.artist
    },
    libraryAlbumData () {
      return this.libraryData?.album
    },
    libraryData () {
      return this.profileData?.library
    },
    artistName () {
      return this.libraryAlbumArtistData?.name
    },
    albumTitle () {
      return this.libraryAlbumData?.title
    },
    profileLibraryAlbumArgs () {
      return {
        profileId: this.profileId,
        albumId: this.albumId,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  watch: {
    profileData: 'handleNavigationDataChange'
  },
  mounted () {
    this.getData()
  },
  methods: {
    getProfileLibraryAlbum,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfileLibraryAlbum(
        {
          ...this.profileLibraryAlbumArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
