<template>
  <BasePageContainer
    :isShowLoader="!channelData"
    :isLoading="isLoading"
    :isError="!channelData && !!error"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="channelData"
      :isLoading="isLoading"
      :error="error"
      :channelData="channelData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatVideoChannelPageNavigation
  from '#/formatters/navigation/videoChannel'
import formatVideoChannelVideosPageTab from '#/formatters/tabs/videoChannel'
import getVideoChannel from '#/actions/api/video_channel/get'

export default {
  name: 'BaseChannelPageContainer',
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
    responsePageLimit: Number
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
        limit: this.responsePageLimit
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
