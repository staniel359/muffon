<template>
  <BasePageContainer
    :response-data="tagData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :tag-data="tagData"
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
import formatProfileLibraryTagPageNavigation
  from '@/helpers/formatters/navigation/profile/library/tag'
import formatProfileLibraryTagPageTab
  from '@/helpers/formatters/tabs/profile/library/tag'
import getProfileLibraryTag
  from '@/helpers/actions/api/profile/library/tag/get'

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
      type: Number,
      required: true
    },
    libraryTagId: {
      type: Number,
      required: true
    },
    scope: String,
    limit: Number,
    order: String
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
        libraryTagId: this.libraryTagId,
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
      return this.tagData?.name
    },
    tagData () {
      return this.profileData?.library?.tag
    },
    libraryTagArgs () {
      return {
        profileId: this.profileId,
        libraryTagId: this.libraryTagId,
        scope: this.scope,
        limit: this.limit,
        order: this.order
      }
    },
    topTracksCount () {
      return this.tagData.top_tracks_count
    },
    topAlbumsCount () {
      return this.tagData.top_albums_count
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
