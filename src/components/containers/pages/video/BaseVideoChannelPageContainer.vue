<template>
  <BasePageContainer
    :response-data="channelData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :channel-data="channelData"
      :is-loading="isLoading"
      :error="error"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatVideoChannelPageNavigation
  from '*/helpers/formatters/navigation/videoChannel'
import formatVideoChannelPageTab
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
    scope: String,
    limit: Number
  },
  data () {
    return {
      channelData: null,
      error: null,
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
        channelTitle: this.channelTitle,
        scope: this.scope
      }
    },
    tabData () {
      return formatVideoChannelPageTab(
        this.navigationData
      )
    },
    channelTitle () {
      return this.channelData?.title
    },
    videoChannelArgs () {
      return {
        channelId: this.channelId,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  watch: {
    channelData: 'handleNavigationDataChange'
  },
  mounted () {
    this.getData()
  },
  methods: {
    getVideoChannel,
    getData (
      {
        page
      } = {}
    ) {
      if (page) {
        this.channelData.videos = []
      }

      this.getVideoChannel(
        {
          ...this.videoChannelArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
