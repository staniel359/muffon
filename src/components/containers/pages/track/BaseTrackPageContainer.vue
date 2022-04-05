<template>
  <BasePageContainer
    :responseData="trackData"
    :isLoading="isLoading"
    :error="error"
  >
    <slot
      :trackData="trackData"
      :requestTrackData="requestTrackData"
      :profileId="profileId"
      :isLoading="isLoading"
      :error="error"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import { mapState } from 'vuex'
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatTrackPageNavigation from '*/helpers/formatters/navigation/track'
import formatTrackPageTab from '*/helpers/formatters/tabs/track'
import getTrack from '*/helpers/actions/api/track/get'
import getBandcampTrackId
  from '*/helpers/actions/api/bandcampId/track/get'
import { artistName as formatArtistName } from '*/helpers/formatters'

export default {
  name: 'BaseTrackPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  provide () {
    return {
      setRequestTrackData: this.setRequestTrackData,
      resetRequestTrackData: this.resetRequestTrackData
    }
  },
  props: {
    sourceParams: {
      type: Object,
      required: true
    },
    scope: String,
    limit: Number
  },
  data () {
    return {
      error: null,
      requestTrackData: null,
      trackData: null,
      isLoading: false
    }
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    profileId () {
      return this.profileInfo.id.toString()
    },
    navigationSections () {
      return formatTrackPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        artistName: this.artistNameFetched,
        trackTitle: this.trackTitleFetched,
        sourceParams: this.sourceParams,
        scope: this.scope
      }
    },
    tabData () {
      return formatTrackPageTab(
        this.navigationData
      )
    },
    artistNameFetched () {
      if (this.artists) {
        return formatArtistName(
          this.artists
        )
      } else {
        return null
      }
    },
    artists () {
      return this.trackData?.artists
    },
    trackTitleFetched () {
      return this.trackData?.title
    },
    trackArgs () {
      return {
        ...this.requestTrackData,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  watch: {
    requestTrackData: 'handleRequestTrackDataChange',
    trackData: 'handleNavigationDataChange'
  },
  mounted () {
    this.resetRequestTrackData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    handleRequestTrackDataChange () {
      this.fetchData()
    },
    getBandcampTrackId,
    getTrack,
    resetRequestTrackData () {
      this.setRequestTrackData(
        this.sourceParams
      )
    },
    setRequestTrackData (value) {
      if (this.isGetBandcampTrackId(value)) {
        this.getBandcampTrackId(value)
      } else {
        this.requestTrackData = value
      }
    },
    isGetBandcampTrackId (value) {
      return (
        value.sourceId === 'bandcamp' &&
          !(
            value.trackId &&
              value.artistId
          )
      )
    },
    fetchData (page) {
      this.getTrack({
        ...this.trackArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
