<template>
  <BasePageContainer
    :responseData="libraryTrackData"
    :isLoading="isLoading"
    :error="error"
  >
    <slot
      :libraryTrackData="libraryTrackData"
      :isLoading="isLoading"
      :error="error"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatProfileLibraryTrackPageNavigation
  from '*/helpers/formatters/navigation/profile/library/track'
import formatProfileLibraryTrackPageTab
  from '*/helpers/formatters/tabs/profile/library/track'
import getProfileLibraryTrack
  from '*/helpers/actions/api/profile/library/track/get'

export default {
  name: 'BaseProfileLibraryTrackPageContainer',
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
    trackId: {
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
        scope: this.scope
      }
    },
    tabData () {
      return formatProfileLibraryTrackPageTab(
        this.navigationData
      )
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
    libraryArgs () {
      return {
        profileId: this.profileId,
        trackId: this.trackId,
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
    getProfileLibraryTrack,
    fetchData (page) {
      this.getProfileLibraryTrack({
        ...this.libraryArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
