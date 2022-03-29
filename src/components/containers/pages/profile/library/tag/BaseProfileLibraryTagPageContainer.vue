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
      :libraryTagData="libraryTagData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
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
import getLibraryTag from '*/helpers/actions/api/library/tag/get'

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
        pageNameKey: this.pageNameKey
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
    getLibraryTag,
    fetchData (page) {
      this.getLibraryTag({
        ...this.libraryTagArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
