<template>
  <BasePageContainer
    :response-data="videoData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :video-data="videoData"
      :is-loading="isLoading"
      :error="error"
    />
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
      videoData: null,
      error: null,
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
        videoTitle: this.videoTitle,
        channelId: this.channelId,
        channelTitle: this.channelTitle,
        scope: this.scope
      }
    },
    tabData () {
      return formatVideoPageTab(
        this.navigationData
      )
    },
    videoTitle () {
      return this.videoData?.title
    },
    channelId () {
      return this.videoData?.channel?.youtube_id
    },
    channelTitle () {
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
    this.getData()
  },
  methods: {
    getVideo,
    getData (
      {
        page
      } = {}
    ) {
      this.getVideo(
        {
          ...this.videoArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
