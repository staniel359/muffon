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
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatProfileLibraryPageNavigation
  from '*/helpers/formatters/navigation/profile/library'
import formatProfileLibraryPageTab
  from '*/helpers/formatters/tabs/profile/library'
import getLibrary from '*/helpers/actions/api/library/get'
import getLibrarySearch from '*/helpers/actions/api/library/search/get'

export default {
  name: 'BaseProfileLibraryPageContainer',
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
    scope: String,
    responsePageLimit: Number,
    pageNameKey: String,
    query: String
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
    tabData () {
      return formatProfileLibraryPageTab(
        this.navigationData
      )
    },
    profileNicknameFetched () {
      return this.profileData?.nickname
    },
    libraryArgs () {
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
    profileData: 'handleNavigationDataChange',
    query: 'handleQueryChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    handleQueryChange () {
      this.fetchData()
    },
    getLibrary,
    getLibrarySearch,
    fetchData (page) {
      if (this.query) {
        this.getLibrarySearch({
          ...this.libraryArgs,
          query: this.query,
          page
        })
      } else {
        this.getLibrary({
          ...this.libraryArgs,
          page
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
