<template>
  <BasePageContainer
    :isShowLoader="!profileData"
    :isLoading="isLoading"
    :isError="!profileData && !!error"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="profileData"
      :isLoading="isLoading"
      :error="error"
      :profileData="profileData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatProfilePageNavigation from '#/formatters/navigation/profile'
import formatProfilePostsPageTab from '#/formatters/tabs/profile/posts'
import fetchProfilePostsData from '#/actions/api/profile/posts/fetchData'

export default {
  name: 'BasePostsPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    },
    responsePageLimit: Number
  },
  data () {
    return {
      profileData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatProfilePageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        profileId: this.profileId,
        profileNickname: this.profileNicknameFetched,
        pageNameKey: 'posts'
      }
    },
    tabData () {
      return formatProfilePostsPageTab(
        this.navigationData
      )
    },
    profileNicknameFetched () {
      return this.profileData?.nickname
    },
    profilePostsDataArgs () {
      return {
        profileId: this.profileId,
        limit: this.responsePageLimit
      }
    }
  },
  watch: {
    profileData: 'handleNavigationDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    fetchProfilePostsData,
    fetchData (page) {
      this.fetchProfilePostsData({
        ...this.profilePostsDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
