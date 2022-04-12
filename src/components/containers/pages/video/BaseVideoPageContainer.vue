<template>
  <BasePageContainer
    :responseData="videoData"
    :isLoading="isLoading"
    :error="error"
  >
    <slot
      :videoData="videoData"
      :isLoading="isLoading"
      :error="error"
      :fetchData="fetchData"
      :refresh="refresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatVideoPageNavigation from '*/helpers/formatters/navigation/video'
import formatVideoPageTab from '*/helpers/formatters/tabs/video'
import getVideo from '*/helpers/actions/api/video/get'

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
    scope: String,
    limit: Number
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
        scope: this.scope
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
    videoArgs () {
      return {
        videoId: this.videoId,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  watch: {
    videoData: 'handleNavigationDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getVideo,
    fetchData (page) {
      this.getVideo({
        ...this.videoArgs,
        page
      })
    },
    refresh (page) {
      this.fetchData(page)
    }
  }
}
</script>

<style lang="sass" scoped></style>
