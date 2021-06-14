<template>
  <BasePageContainer
    :isShowLoader="!videoData"
    :isLoading="isLoading"
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
import BasePageContainer from '@/containers/BasePageContainer.vue'
import { setNavigationSections } from '#/actions/layout'
import {
  navigation as formatVideoPageNavigation
} from '#/formatters/navigation/video'
import fetchVideoData from '#/actions/api/video/fetchData'

export default {
  name: 'BaseVideoPageContainer',
  components: {
    BasePageContainer
  },
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
      return formatVideoPageNavigation({
        videoId: this.videoId,
        videoTitle: this.videoTitleFetched,
        channelId: this.channelIdFetched,
        channelTitle: this.channelTitleFetched,
        pageNameKey: this.pageNameKey
      })
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
    videoTitleFetched: {
      immediate: true,
      handler: 'handleNavigationDataChange'
    },
    channelTitleFetched: {
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
