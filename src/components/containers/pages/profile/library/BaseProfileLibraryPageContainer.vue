<template>
  <BasePageContainer
    :response-data="libraryData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :library-data="libraryData"
      :top-tracks-count="topTracksCount"
      :top-albums-count="topAlbumsCount"
      :is-loading="isLoading"
      :error="error"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '@/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '@/mixins/navigationMixin'
import formatProfileLibraryPageNavigation
  from '@/helpers/formatters/navigation/profile/library'
import formatProfileLibraryPageTab
  from '@/helpers/formatters/tabs/profile/library'
import getProfileLibrary from '@/helpers/actions/api/profile/library/get'
import getProfileLibrarySearch
  from '@/helpers/actions/api/profile/library/search/get'

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
    order: String,
    query: String
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
      return formatProfileLibraryPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        profileId: this.profileId,
        profileNickname: this.profileNickname,
        scope: this.scope
      }
    },
    tabData () {
      return formatProfileLibraryPageTab(
        this.navigationData
      )
    },
    profileNickname () {
      return this.profileData?.nickname
    },
    libraryArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.limit,
        order: this.order
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
    profileData: 'handleNavigationDataChange'
  },
  mounted () {
    this.getData()
  },
  methods: {
    getProfileLibrary,
    getProfileLibrarySearch,
    getData (
      {
        page
      } = {}
    ) {
      if (this.query) {
        this.getProfileLibrarySearch(
          {
            ...this.libraryArgs,
            query: this.query,
            page
          }
        )
      } else {
        this.getProfileLibrary(
          {
            ...this.libraryArgs,
            page
          }
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
