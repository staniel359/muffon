<template>
  <BasePageContainer
    :responseData="channelData"
    :isLoading="isLoading"
    :error="error"
  >
    <slot
      :channelData="channelData"
      :isLoading="isLoading"
      :error="error"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatVideoChannelPageNavigation
  from '*/helpers/formatters/navigation/videoChannel'
import formatVideoChannelVideosPageTab
  from '*/helpers/formatters/tabs/videoChannel'
import getVideoChannel from '*/helpers/actions/api/videoChannel/get'

export default {
  name: 'BaseVideoChannelPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    channelId: {
      type: String,
      required: true
    },
    limit: Number
  },
  data () {
    return {
      error: null,
      channelData: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatVideoChannelPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        channelId: this.channelId,
        channelTitle: this.channelTitleFetched
      }
    },
    tabData () {
      return formatVideoChannelVideosPageTab(
        this.navigationData
      )
    },
    channelTitleFetched () {
      return this.channelData?.title
    },
    videoChannelArgs () {
      return {
        channelId: this.channelId,
        scope: 'videos',
        limit: this.limit
      }
    }
  },
  watch: {
    channelData: 'handleNavigationDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getVideoChannel,
    fetchData (page) {
      if (page) {
        this.channelData.videos = []
      }

      this.getVideoChannel({
        ...this.videoChannelArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
