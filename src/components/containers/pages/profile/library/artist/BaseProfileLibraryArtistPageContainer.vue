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
      :libraryArtistData="libraryArtistData"
      :artistName="artistNameFetched"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatProfileLibraryArtistPageNavigation
  from '*/helpers/formatters/navigation/profile/library/artist'
import formatProfileLibraryArtistPageTab
  from '*/helpers/formatters/tabs/profile/library/artist'
import getLibraryArtist from '*/helpers/actions/api/library/artist/get'

export default {
  name: 'BaseProfileLibraryArtistPageContainer',
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
    artistId: {
      type: String,
      required: true
    },
    scope: String,
    responsePageLimit: Number
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
      return formatProfileLibraryArtistPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        profileId: this.profileId,
        profileNickname: this.profileNicknameFetched,
        artistId: this.artistId,
        artistName: this.artistNameFetched,
        scope: this.scope
      }
    },
    tabData () {
      return formatProfileLibraryArtistPageTab(
        this.navigationData
      )
    },
    profileNicknameFetched () {
      return this.profileData?.nickname
    },
    artistNameFetched () {
      return this.libraryArtistData?.name
    },
    libraryArtistData () {
      return this.libraryData?.artist
    },
    libraryData () {
      return this.profileData?.library
    },
    libraryArgs () {
      return {
        profileId: this.profileId,
        artistId: this.artistId,
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
    getLibraryArtist,
    fetchData (page) {
      this.getLibraryArtist({
        ...this.libraryArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
