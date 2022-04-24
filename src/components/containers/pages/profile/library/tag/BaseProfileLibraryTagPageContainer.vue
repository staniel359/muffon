<template>
  <BasePageContainer
    :response-data="libraryTagData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :library-tag-data="libraryTagData"
      :top-tracks-count="topTracksCount"
      :top-albums-count="topAlbumsCount"
      :is-loading="isLoading"
      :error="error"
    />
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
      profileData: null,
      error: null,
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
        profileNickname: this.profileNickname,
        tagId: this.tagId,
        tagName: this.tagName,
        scope: this.scope
      }
    },
    tabData () {
      return formatProfileLibraryTagPageTab(
        this.navigationData
      )
    },
    profileNickname () {
      return this.profileData?.nickname
    },
    tagName () {
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
    this.getData()
  },
  methods: {
    getProfileLibraryTag,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfileLibraryTag(
        {
          ...this.libraryTagArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
