<template>
  <BasePageContainer
    :response-data="trackData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :track-data="trackData"
      :top-tracks-count="topTracksCount"
      :is-loading="isLoading"
      :error="error"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '@/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '@/mixins/navigationMixin'
import formatProfileLibraryTrackPageNavigation
  from '@/helpers/formatters/navigation/profile/library/track'
import formatProfileLibraryTrackPageTab
  from '@/helpers/formatters/tabs/profile/library/track'
import getProfileLibraryTrack
  from '@/helpers/actions/api/profile/library/track/get'

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
      type: Number,
      required: true
    },
    libraryTrackId: {
      type: Number,
      required: true
    },
    scope: String,
    limit: Number,
    order: String
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
        profileNickname:
          this.profileNickname,
        libraryArtistId:
          this.libraryArtistId,
        artistName: this.artistName,
        libraryTrackId:
          this.libraryTrackId,
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
    libraryArtistId () {
      return this.trackData?.library?.artist?.id
    },
    trackData () {
      return this.libraryData?.track
    },
    libraryData () {
      return this.profileData?.library
    },
    artistName () {
      return this.trackData?.artist?.name
    },
    trackTitle () {
      return this.trackData?.title
    },
    profileLibraryTrackArgs () {
      return {
        profileId: this.profileId,
        libraryTrackId: this.libraryTrackId,
        scope: this.scope,
        limit: this.limit,
        order: this.order
      }
    },
    topTracksCount () {
      return this.libraryData?.top_tracks_count
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
