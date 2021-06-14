<template>
  <BasePageContainer
    :isShowLoader="!channelData"
    :isLoading="isLoading"
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
import BasePageContainer from '@/containers/BasePageContainer.vue'
import { setNavigationSections } from '#/actions/layout'
import {
  navigation as formatVideoChannelPageNavigation
} from '#/formatters/navigation/videoChannel'
import fetchVideoChannelData from '#/actions/api/videoChannel/fetchData'

export default {
  name: 'BaseChannelPageContainer',
  components: {
    BasePageContainer
  },
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
      return formatVideoChannelPageNavigation({
        channelTitle: this.channelTitleFetched
      })
    },
    channelTitleFetched () {
      return this.channelData?.title
    },
    channelDataArgs () {
      return {
        channelId: this.channelId,
        scope: 'videos',
        limit: this.responsePageLimit
      }
    }
  },
  watch: {
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
    fetchVideoChannelData,
    fetchData (page) {
      page && (this.channelData = {})

      this.fetchVideoChannelData({
        ...this.channelDataArgs,
        page,
        limit: this.responsePageLimit
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
