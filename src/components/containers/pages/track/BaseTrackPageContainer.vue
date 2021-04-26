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
      :artistName="artistName"
      :trackTitle="trackTitle"
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
    artistName () {
      return (
        this.trackData?.artist?.name ||
          this.$route.params.artistName
      )
    },
    trackTitle () {
      return (
        this.trackData?.title ||
          this.$route.params.trackTitle
      )
    },
    navigationSections () {
      return formatTrackPageNavigation({
        artistName: this.artistName,
        trackTitle: this.trackTitle,
        pageNameKey: this.pageNameKey
      })
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
    artistName: {
      immediate: true,
      handler: 'handleArtistNameChange'
    },
    trackTitle: {
      immediate: true,
      handler: 'handleTrackTitleChange'
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
    handleArtistNameChange () {
      this.setNavigation()
    },
    handleTrackTitleChange () {
      this.setNavigation()
    },
    setNavigation () {
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
