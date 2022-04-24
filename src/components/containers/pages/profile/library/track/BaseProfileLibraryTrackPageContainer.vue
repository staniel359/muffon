<template>
  <BasePageContainer
    :response-data="libraryTrackData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :library-track-data="libraryTrackData"
    />
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
      return formatProfileLibraryTrackPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        profileId: this.profileId,
        profileNickname: this.profileNickname,
        artistId: this.artistId,
        artistName: this.artistName,
        trackId: this.trackId,
        trackTitle: this.trackTitle,
        scope: this.scope
      }
    },
    tabData () {
      return formatProfileLibraryTrackPageTab(
        this.navigationData
      )
    },
    profileNickname () {
      return this.profileData?.nickname
    },
    artistId () {
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
    artistName () {
      return this.libraryTrackArtistData?.name
    },
    trackTitle () {
      return this.libraryTrackData?.title
    },
    profileLibraryTrackArgs () {
      return {
        profileId: this.profileId,
        trackId: this.trackId,
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
    getProfileLibraryTrack,
    getData () {
      this.getProfileLibraryTrack(
        this.profileLibraryTrackArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
