<template>
  <BasePageContainer
    :isShowLoader="!trackData"
    :isLoading="isLoading"
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
    ></slot>
  </BasePageContainer>
</template>

<script>
import { mapActions } from 'vuex'
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
    navigationSections () {
      return formatTrackPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        artistName: this.artistNameFetched,
        trackTitle: this.trackTitleFetched,
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
    trackData: 'handleTrackDataChange'
  },
  mounted () {
    this.resetRequestTrackData()
  },
  methods: {
    ...mapActions('layout', [
      'setNavigationSections'
    ]),
    handleRefresh (page) {
      this.error = null

      this.fetchData(page)
    },
    handleTrackDataChange () {
      this.setNavigationSections(
        this.navigationSections
      )

      updateTab(
        formatTrackPageTab(
          this.navigationData
        )
      )
    },
    handleRequestTrackDataChange () {
      this.fetchData()
    },
    resetRequestTrackData () {
      this.setRequestTrackData({
        artistName: this.artistName,
        trackTitle: this.trackTitle
      })
    },
    setRequestTrackData (value) {
      if (value.sourceId === 'bandcamp') {
        this.fetchBandcampTrackIdData(value)
      } else {
        this.requestTrackData = value
      }
    },
    fetchBandcampTrackIdData,
    fetchTrackData,
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
