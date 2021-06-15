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
import BasePageContainer from '@/containers/BasePageContainer.vue'
import { setNavigationSections } from '#/actions/layout'
import {
  navigation as formatTrackPageNavigation
} from '#/formatters/navigation/track'
import fetchTrackData from '#/actions/api/track/fetchData'

export default {
  name: 'BaseTrackPageContainer',
  components: {
    BasePageContainer
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
      isLoading: false,
      error: null,
      trackData: null
    }
  },
  computed: {
    navigationSections () {
      return formatTrackPageNavigation({
        artistName: this.artistNameFetched,
        trackTitle: this.trackTitleFetched,
        pageNameKey: this.pageNameKey
      })
    },
    artistNameFetched () {
      return this.trackData?.artist?.name
    },
    trackTitleFetched () {
      return this.trackData?.title
    },
    trackDataArgs () {
      return {
        artistName: this.artistName,
        trackTitle: this.trackTitle,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  watch: {
    artistNameFetched: {
      immediate: true,
      handler: 'handleNavigationDataChange'
    },
    trackTitleFetched: {
      immediate: true,
      handler: 'handleNavigationDataChange'
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.error = null

      this.fetchData(page)
    },
    handleNavigationDataChange () {
      setNavigationSections(
        this.navigationSections
      )
    },
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
