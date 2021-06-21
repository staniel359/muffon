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
import { updateTab } from '#/actions'

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
        artistName: this.artistName,
        trackTitle: this.trackTitle,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  watch: {
    trackData: 'handleTrackDataChange'
  },
  mounted () {
    this.fetchData()
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
