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
import { mapState, mapActions } from 'vuex'
import BasePageContainer from '@/containers/BasePageContainer.vue'
import formatVideoChannelPageNavigation
  from '#/formatters/navigation/videoChannel'
import formatVideoChannelVideosPageTab from '#/formatters/tabs/videoChannel'
import fetchVideoChannelData from '#/actions/api/videoChannel/fetchData'
import { updateTab } from '#/actions'

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
    ...mapState('profile', {
      profileLanguage: 'language'
    }),
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
    channelData: 'handleChannelDataChange',
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
    handleChannelDataChange () {
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
        formatVideoChannelVideosPageTab(
          this.navigationData
        )
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
