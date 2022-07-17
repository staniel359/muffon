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
import formatRequestTrackData from '*/helpers/formatters/request/track/data'
import getTrack from '*/helpers/actions/api/track/get'
import getBandcampId from '*/helpers/actions/api/bandcampId/get'

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
      setRequestTrackData:
        this.setRequestTrackData,
      resetRequestTrackData:
        this.resetRequestTrackData
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
    artistName () {
      return this.trackData?.artist?.name
    },
    trackTitle () {
      return this.trackData?.title
    },
    tabData () {
      return formatTrackPageTab(
        this.navigationData
      )
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
    requestTrackData:
      'handleRequestTrackDataChange',
    trackData:
      'handleNavigationDataChange'
  },
  mounted () {
    this.resetRequestTrackData()
  },
  methods: {
    getTrack,
    getBandcampId,
    handleRequestTrackDataChange () {
      this.getData()
    },
    resetRequestTrackData () {
      this.setRequestTrackData(
        this.sourceParams
      )
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
      const isBandcampSource = (
        value.source?.name ===
          'bandcamp'
      )

      const isBandcampTrackIdPresent = (
        value.source?.id &&
          value.source?.artist_id
      )

      const isGetBandcampId = (
        isBandcampSource &&
          !isBandcampTrackIdPresent
      )

      if (isGetBandcampId) {
        this.getBandcampTrackData(
          value
        )
      } else {
        this.setFormattedRequestTrackData(
          value
        )
      }
    },
    getBandcampTrackData (
      value
    ) {
      const bandcampIdArgs = {
        model: 'track',
        slug: value.source.slug,
        artistSlug:
          value.source.artist_slug
      }

      this.getBandcampId(
        bandcampIdArgs
      ).then(
        this.setFormattedRequestTrackData
      )
    },
    setFormattedRequestTrackData (
      value
    ) {
      this.requestTrackData =
        formatRequestTrackData(
          {
            trackData: value
          }
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
