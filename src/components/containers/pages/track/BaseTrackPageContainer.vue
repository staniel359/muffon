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
      :artistName="artistNameFormatted"
      :trackTitle="trackTitleFormatted"
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
        artistName: this.artistName,
        trackTitle: this.trackTitle,
        pageNameKey: this.pageNameKey
      })
    },
    artistNameFormatted () {
      return (
        this.trackData?.artist?.name ||
          this.artistName
      )
    },
    trackTitleFormatted () {
      return (
        this.trackData?.title ||
          this.trackTitle
      )
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
    artistNameFormatted: {
      immediate: true,
      handler: 'handleNavigationDataChange'
    },
    trackTitleFormatted: {
      immediate: true,
      handler: 'handleNavigationDataChange'
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh () {
      this.error = null

      this.fetchData()
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
