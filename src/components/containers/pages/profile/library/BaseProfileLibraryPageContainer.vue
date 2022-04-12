<template>
  <BasePageContainer
    :responseData="libraryData"
    :isLoading="isLoading"
    :error="error"
  >
    <slot
      :libraryData="libraryData"
      :topTracksCount="topTracksCount"
      :topAlbumsCount="topAlbumsCount"
      :isLoading="isLoading"
      :error="error"
      :fetchData="fetchData"
      :refresh="refresh"
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
import getProfileLibrary from '*/helpers/actions/api/profile/library/get'
import getProfileLibrarySearch
  from '*/helpers/actions/api/profile/library/search/get'

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
    limit: Number,
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
        scope: this.scope
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
        limit: this.limit
      }
    },
    libraryData () {
      return this.profileData?.library
    },
    topTracksCount () {
      return this.libraryData.top_tracks_count
    },
    topAlbumsCount () {
      return this.libraryData.top_albums_count
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
    handleQueryChange () {
      this.fetchData()
    },
    getProfileLibrary,
    getProfileLibrarySearch,
    fetchData (page) {
      if (this.query) {
        this.getProfileLibrarySearch({
          ...this.libraryArgs,
          query: this.query,
          page
        })
      } else {
        this.getProfileLibrary({
          ...this.libraryArgs,
          page
        })
      }
    },
    refresh (page) {
      this.fetchData(page)
    }
  }
}
</script>

<style lang="sass" scoped></style>
