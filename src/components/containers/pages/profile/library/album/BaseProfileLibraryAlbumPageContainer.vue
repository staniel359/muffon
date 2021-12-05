<template>
  <BasePageContainer
    :isShowLoader="!libraryData"
    :isLoading="isLoading"
    :isError="!libraryData && !!error"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="libraryData"
      :isLoading="isLoading"
      :error="error"
      :libraryAlbumData="libraryAlbumData"
      :artistId="artistIdFetched"
      :artistName="artistNameFetched"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatProfileLibraryAlbumPageNavigation
  from '#/formatters/navigation/profile/library/album'
import formatProfileLibraryAlbumPageTab
  from '#/formatters/tabs/profile/library/album'
import fetchProfileLibraryAlbumData
  from '#/actions/api/profile/library/album/fetchData'

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
    responsePageLimit: Number,
    pageNameKey: String
  },
  data () {
    return {
      error: null,
      profileData: null,
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
        profileNickname: this.profileNicknameFetched,
        artistId: this.artistIdFetched,
        artistName: this.artistNameFetched,
        albumId: this.albumId,
        albumTitle: this.albumTitleFetched,
        pageNameKey: this.pageNameKey
      }
    },
    tabData () {
      return formatProfileLibraryAlbumPageTab(
        this.navigationData
      )
    },
    profileNicknameFetched () {
      return this.profileData?.nickname
    },
    artistIdFetched () {
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
    artistNameFetched () {
      return this.libraryAlbumArtistData?.name
    },
    albumTitleFetched () {
      return this.libraryAlbumData?.title
    },
    libraryDataArgs () {
      return {
        profileId: this.profileId,
        albumId: this.albumId,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  watch: {
    profileData: 'handleNavigationDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    fetchProfileLibraryAlbumData,
    fetchData (page) {
      this.fetchProfileLibraryAlbumData({
        ...this.libraryDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
