<template>
  <BasePageContainer
    :responseData="libraryTagData"
    :isLoading="isLoading"
    :error="error"
  >
    <slot
      :libraryTagData="libraryTagData"
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
import formatProfileLibraryTagPageNavigation
  from '*/helpers/formatters/navigation/profile/library/tag'
import formatProfileLibraryTagPageTab
  from '*/helpers/formatters/tabs/profile/library/tag'
import getProfileLibraryTag
  from '*/helpers/actions/api/profile/library/tag/get'

export default {
  name: 'BaseProfileLibraryTagPageContainer',
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
    tagId: {
      type: String,
      required: true
    },
    scope: String,
    limit: Number
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
      return formatProfileLibraryTagPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        profileId: this.profileId,
        profileNickname: this.profileNicknameFetched,
        tagId: this.tagId,
        tagName: this.tagNameFetched,
        scope: this.scope
      }
    },
    tabData () {
      return formatProfileLibraryTagPageTab(
        this.navigationData
      )
    },
    profileNicknameFetched () {
      return this.profileData?.nickname
    },
    tagNameFetched () {
      return this.libraryTagData?.name
    },
    libraryTagData () {
      return this.libraryData?.tag
    },
    libraryData () {
      return this.profileData?.library
    },
    libraryTagArgs () {
      return {
        profileId: this.profileId,
        tagId: this.tagId,
        scope: this.scope,
        limit: this.limit
      }
    },
    topTracksCount () {
      return this.libraryTagData.top_tracks_count
    },
    topAlbumsCount () {
      return this.libraryTagData.top_albums_count
    }
  },
  watch: {
    profileData: 'handleNavigationDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getProfileLibraryTag,
    fetchData (page) {
      this.getProfileLibraryTag({
        ...this.libraryTagArgs,
        page
      })
    },
    refresh (page) {
      this.fetchData(page)
    }
  }
}
</script>

<style lang="sass" scoped></style>
