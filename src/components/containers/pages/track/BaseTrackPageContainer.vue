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
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
      :profileId="profileId"
    ></slot>
  </BasePageContainer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BasePageContainer from '@/containers/BasePageContainer.vue'
import formatTrackPageNavigation from '#/formatters/navigation/track'
import formatTrackPageTab from '#/formatters/tabs/track'
import fetchTrackData from '#/actions/api/track/fetchData'
import fetchBandcampTrackIdData
  from '#/actions/api/track/id/bandcamp/fetchData'
import { updateTab } from '#/actions'

export default {
  name: 'BaseTrackPageContainer',
  components: {
    BasePageContainer
  },
  provide () {
    return {
      setRequestTrackData: this.setRequestTrackData,
      resetRequestTrackData: this.resetRequestTrackData
    }
  },
  props: {
    artistName: {
      type: String,
      required: true
    },
    trackTitle: {
      type: String,
      required: true
    },
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
      profileInfo: 'info',
      profileLanguage: 'language'
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
    artistNameFetched () {
      return this.trackData?.artist?.name
    },
    trackTitleFetched () {
      return this.trackData?.title
    },
    trackDataArgs () {
      return {
        ...this.requestTrackData,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  watch: {
    requestTrackData: 'handleRequestTrackDataChange',
    trackData: 'handleTrackDataChange',
    profileLanguage: 'handleProfileLanguageChange'
  },
  mounted () {
    this.resetRequestTrackData()
  },
  methods: {
    ...mapActions('layout', [
      'setNavigationSections'
    ]),
    handleRefresh (page) {
      this.fetchData(page)
    },
    handleTrackDataChange () {
      this.setNavigation()
    },
    handleRequestTrackDataChange () {
      this.fetchData()
    },
    handleProfileLanguageChange () {
      this.setNavigation()
    },
    fetchBandcampTrackIdData,
    fetchTrackData,
    setNavigation () {
      this.setNavigationSections(
        this.navigationSections
      )

      updateTab(
        formatTrackPageTab(
          this.navigationData
        )
      )
    },
    resetRequestTrackData () {
      this.setRequestTrackData(
        this.sourceParams
      )
    },
    setRequestTrackData (value) {
      if (this.isFetchBandcampTrackIdData(value)) {
        this.fetchBandcampTrackIdData(value)
      } else {
        this.requestTrackData = value
      }
    },
    isFetchBandcampTrackIdData (value) {
      return (
        value.sourceId === 'bandcamp' &&
          !(
            value.trackId &&
              value.artistId
          )
      )
    },
    fetchData (page) {
      this.fetchTrackData({
        ...this.trackDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
