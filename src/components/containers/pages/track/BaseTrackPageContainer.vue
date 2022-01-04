<template>
  <BasePageContainer
    :isShowLoader="!trackData"
    :isLoading="isLoading"
    :isError="!trackData && !!error"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="trackData"
      :isLoading="isLoading"
      :error="error"
      :trackData="trackData"
      :requestTrackData="requestTrackData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
      :profileId="profileId"
    ></slot>
  </BasePageContainer>
</template>

<script>
import { mapState } from 'vuex'
import BasePageContainer from '@/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatTrackPageNavigation from '#/formatters/navigation/track'
import formatTrackPageTab from '#/formatters/tabs/track'
import getTrack from '#/actions/api/track/get'
import getBandcampTrackId
  from '#/actions/api/bandcamp_id/track/get'
import { artistName as formatArtistName } from '#/formatters/artist'

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
    responsePageLimit: Number,
    pageNameKey: String
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
        pageNameKey: this.pageNameKey
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
        limit: this.responsePageLimit
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
