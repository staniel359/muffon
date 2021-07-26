<template>
  <BasePageContainer
    :isShowLoader="!profileData"
    :isLoading="isLoading"
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
import { mapActions } from 'vuex'
import BasePageContainer from '@/containers/BasePageContainer.vue'
import formatProfilePageNavigation from '#/formatters/navigation/profile'
import formatProfilePageTab from '#/formatters/tabs/profile'
import fetchProfileData from '#/actions/api/profile/fetchData'
import { updateTab } from '#/actions'

export default {
  name: 'BaseProfilePageContainer',
  components: {
    BasePageContainer
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    scope: String,
    responsePageLimit: Number,
    pageNameKey: String
  },
  data () {
    return {
      error: null,
      profileData: null,
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
        pageNameKey: this.pageNameKey
      }
    },
    profileNicknameFetched () {
      return this.profileData?.nickname
    },
    profileDataArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  watch: {
    profileData: 'handleProfileDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    ...mapActions('layout', [
      'setNavigationSections'
    ]),
    handleRefresh (page) {
      this.error = null

      this.fetchData(page)
    },
    handleProfileDataChange () {
      this.setNavigationSections(
        this.navigationSections
      )

      updateTab(
        formatProfilePageTab(
          this.navigationData
        )
      )
    },
    fetchProfileData,
    fetchData (page) {
      this.fetchProfileData({
        ...this.profileDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
