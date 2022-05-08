<template>
  <BasePageContainer
    :response-data="albumData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :album-data="albumData"
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
    libraryAlbumId: {
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
        libraryArtistId: this.libraryArtistId,
        artistName: this.artistName,
        libraryAlbumId: this.libraryAlbumId,
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
    libraryArtistId () {
      return this.albumData?.library?.artist?.id
    },
    albumData () {
      return this.profileData?.library?.album
    },
    artistName () {
      return this.albumData?.artist?.name
    },
    albumTitle () {
      return this.albumData?.title
    },
    profileLibraryAlbumArgs () {
      return {
        profileId: this.profileId,
        libraryAlbumId: this.libraryAlbumId,
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
