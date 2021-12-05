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
import { mapState, mapActions } from 'vuex'
import BasePageContainer from '@/containers/BasePageContainer.vue'
import formatProfilePageNavigation from '#/formatters/navigation/profile'
import formatProfilePostsPageTab from '#/formatters/tabs/profile/posts'
import fetchProfilePostsData from '#/actions/api/profile/posts/fetchData'
import { updateTab } from '#/actions'

export default {
  name: 'BasePostsPageContainer',
  components: {
    BasePageContainer
  },
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
    ...mapState('profile', {
      profileLanguage: 'language'
    }),
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
    profileLanguage: 'handleProfileLanguageChange',
    profileData: 'handleProfileDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    ...mapActions('layout', [
      'setNavigationSections'
    ]),
    handleProfileDataChange () {
      this.setNavigation()
    },
    handleProfileLanguageChange () {
      this.setNavigation()
    },
    handleRefresh (page) {
      this.fetchData(page)
    },
    setNavigation () {
      this.setNavigationSections(
        this.navigationSections
      )

      updateTab(
        formatProfilePostsPageTab(
          this.navigationData
        )
      )
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
