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
      :libraryTrackData="libraryTrackData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import { mapActions } from 'vuex'
import BasePageContainer from '@/containers/BasePageContainer.vue'
import formatProfileLibraryTrackPageNavigation
  from '#/formatters/navigation/profile/library/track'
import formatProfileLibraryTrackPageTab
  from '#/formatters/tabs/profile/library/track'
import fetchProfileLibraryTrackData
  from '#/actions/api/profile/library/track/fetchData'
import { updateTab } from '#/actions'

export default {
  name: 'BaseProfileLibraryTrackPageContainer',
  components: {
    BasePageContainer
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    trackId: {
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
      return formatProfileLibraryTrackPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        profileId: this.profileId,
        profileNickname: this.profileNicknameFetched,
        artistId: this.artistIdFetched,
        artistName: this.artistNameFetched,
        trackId: this.trackId,
        trackTitle: this.trackTitleFetched,
        pageNameKey: this.pageNameKey
      }
    },
    profileNicknameFetched () {
      return this.profileData?.nickname
    },
    artistIdFetched () {
      return this.libraryTrackArtistData?.id?.toString()
    },
    libraryTrackArtistData () {
      return this.libraryTrackData?.artist
    },
    libraryTrackData () {
      return this.libraryData?.track
    },
    libraryData () {
      return this.profileData?.library
    },
    artistNameFetched () {
      return this.libraryTrackArtistData?.name
    },
    trackTitleFetched () {
      return this.libraryTrackData?.title
    },
    libraryDataArgs () {
      return {
        profileId: this.profileId,
        trackId: this.trackId,
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
        formatProfileLibraryTrackPageTab(
          this.navigationData
        )
      )
    },
    fetchProfileLibraryTrackData,
    fetchData (page) {
      this.fetchProfileLibraryTrackData({
        ...this.libraryDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
