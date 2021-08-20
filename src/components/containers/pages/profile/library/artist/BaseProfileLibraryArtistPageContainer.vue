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
import { mapActions } from 'vuex'
import BasePageContainer from '@/containers/BasePageContainer.vue'
import formatProfileLibraryArtistPageNavigation
  from '#/formatters/navigation/profile/library/artist'
import formatProfileLibraryArtistPageTab
  from '#/formatters/tabs/profile/library/artist'
import fetchProfileLibraryArtistData
  from '#/actions/api/profile/library/artist/fetchData'
import { updateTab } from '#/actions'

export default {
  name: 'BaseProfileLibraryArtistPageContainer',
  components: {
    BasePageContainer
  },
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
        pageNameKey: this.pageNameKey
      }
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
    libraryDataArgs () {
      return {
        profileId: this.profileId,
        artistId: this.artistId,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  watch: {
    profileData: 'handleProfileDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    ...mapActions('layout', [
      'setNavigationSections'
    ]),
    handleRefresh (page) {
      this.error = null

      this.fetchData(page)
    },
    handleProfileDataChange () {
      this.setNavigationSections(
        this.navigationSections
      )

      updateTab(
        formatProfileLibraryArtistPageTab(
          this.navigationData
        )
      )
    },
    fetchProfileLibraryArtistData,
    fetchData (page) {
      this.fetchProfileLibraryArtistData({
        ...this.libraryDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
