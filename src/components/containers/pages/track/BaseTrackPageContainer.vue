<template>
  <BasePageContainer
    :response-data="trackData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :track-data="trackData"
      :request-track-data="requestTrackData"
      :is-loading="isLoading"
      :error="error"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatTrackPageNavigation from '*/helpers/formatters/navigation/track'
import formatTrackPageTab from '*/helpers/formatters/tabs/track'
import getTrack from '*/helpers/actions/api/track/get'
import getBandcampTrackId
  from '*/helpers/actions/api/bandcampId/track/get'
import {
  artistName as formatArtistName
} from '*/helpers/formatters'

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
      trackData: null,
      requestTrackData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatTrackPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        artistName: this.artistName,
        trackTitle: this.trackTitle,
        sourceParams: this.sourceParams,
        scope: this.scope
      }
    },
    tabData () {
      return formatTrackPageTab(
        this.navigationData
      )
    },
    artistName () {
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
    trackTitle () {
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
    getTrack,
    getBandcampTrackId,
    handleRequestTrackDataChange () {
      this.getData()
    },
    getData (
      {
        page
      } = {}
    ) {
      this.getTrack(
        {
          ...this.trackArgs,
          page
        }
      )
    },
    setRequestTrackData (
      value
    ) {
      if (this.isGetBandcampTrackId(
        value
      )) {
        this.getBandcampTrackId(
          value
        )
      } else {
        this.requestTrackData = value
      }
    },
    isGetBandcampTrackId (
      value
    ) {
      return (
        value.sourceId === 'bandcamp' &&
          !(
            value.trackId &&
              value.artistId
          )
      )
    },
    resetRequestTrackData () {
      this.setRequestTrackData(
        this.sourceParams
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
