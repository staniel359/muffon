<template>
  <BasePageContainer
    :isShowLoader="!videoData"
    :isLoading="isLoading"
    :isError="!videoData && !!error"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="videoData"
      :isLoading="isLoading"
      :error="error"
      :videoData="videoData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatVideoPageNavigation from '#/formatters/navigation/video'
import formatVideoPageTab from '#/formatters/tabs/video'
import fetchVideoData from '#/actions/api/video/fetchData'

export default {
  name: 'BaseVideoPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    videoId: {
      type: String,
      required: true
    },
    pageNameKey: String
  },
  data () {
    return {
      error: null,
      videoData: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatVideoPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        videoId: this.videoId,
        videoTitle: this.videoTitleFetched,
        channelId: this.channelIdFetched,
        channelTitle: this.channelTitleFetched,
        pageNameKey: this.pageNameKey
      }
    },
    tabData () {
      return formatVideoPageTab(
        this.navigationData
      )
    },
    videoTitleFetched () {
      return this.videoData?.title
    },
    channelIdFetched () {
      return this.videoData?.channel?.youtube_id
    },
    channelTitleFetched () {
      return this.videoData?.channel?.title
    },
    videoDataArgs () {
      return { videoId: this.videoId }
    }
  },
  watch: {
    videoData: 'handleNavigationDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    fetchVideoData,
    fetchData (page) {
      this.fetchVideoData({
        ...this.videoDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
