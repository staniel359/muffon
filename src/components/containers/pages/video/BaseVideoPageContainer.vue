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
import { mapState, mapActions } from 'vuex'
import BasePageContainer from '@/containers/BasePageContainer.vue'
import formatVideoPageNavigation from '#/formatters/navigation/video'
import formatVideoPageTab from '#/formatters/tabs/video'
import fetchVideoData from '#/actions/api/video/fetchData'
import { updateTab } from '#/actions'

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
    ...mapState('profile', {
      profileLanguage: 'language'
    }),
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
    videoData: 'handleVideoDataChange',
    profileLanguage: 'handleProfileLanguageChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    ...mapActions('layout', [
      'setNavigationSections'
    ]),
    handleRefresh (page) {
      this.fetchData(page)
    },
    handleVideoDataChange () {
      this.setNavigation()
    },
    handleProfileLanguageChange () {
      this.setNavigation()
    },
    setNavigation () {
      this.setNavigationSections(
        this.navigationSections
      )

      updateTab(
        formatVideoPageTab(
          this.navigationData
        )
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
