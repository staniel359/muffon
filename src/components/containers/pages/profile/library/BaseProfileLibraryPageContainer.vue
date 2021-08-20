<template>
  <BasePageContainer
    :isShowLoader="!libraryData"
    :isLoading="isLoading"
    :isError="!libraryData && !!error"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="libraryData"
      :isLoading="isLoading"
      :error="error"
      :libraryData="libraryData"
      :profileId="profileId"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import { mapActions } from 'vuex'
import BasePageContainer from '@/containers/BasePageContainer.vue'
import formatProfileLibraryPageNavigation
  from '#/formatters/navigation/profile/library'
import formatProfileLibraryPageTab from '#/formatters/tabs/profile/library'
import fetchProfileLibraryData from '#/actions/api/profile/library/fetchData'
import { updateTab } from '#/actions'

export default {
  name: 'BaseProfileLibraryPageContainer',
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
      return formatProfileLibraryPageNavigation(
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
    libraryDataArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    },
    libraryData () {
      return this.profileData?.library
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
        formatProfileLibraryPageTab(
          this.navigationData
        )
      )
    },
    fetchProfileLibraryData,
    fetchData (page) {
      this.fetchProfileLibraryData({
        ...this.libraryDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
