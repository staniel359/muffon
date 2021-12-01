<template>
  <BasePageContainer
    :isShowLoader="!tagData"
    :isLoading="isLoading"
    :isError="!tagData && !!error"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="tagData"
      :isLoading="isLoading"
      :error="error"
      :tagData="tagData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
      :profileId="profileId"
    ></slot>
  </BasePageContainer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BasePageContainer from '@/containers/BasePageContainer.vue'
import formatTagPageNavigation from '#/formatters/navigation/tag'
import formatTagPageTab from '#/formatters/tabs/tag'
import fetchTagData from '#/actions/api/tag/fetchData'
import { updateTab } from '#/actions'

export default {
  name: 'BaseTagPageContainer',
  components: {
    BasePageContainer
  },
  props: {
    tagName: {
      type: String,
      required: true
    },
    scope: String,
    responsePageLimit: Number,
    pageNameKey: String
  },
  data () {
    return {
      isLoading: false,
      error: null,
      tagData: null
    }
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info',
      profileLanguage: 'language'
    }),
    profileId () {
      return this.profileInfo.id.toString()
    },
    navigationSections () {
      return formatTagPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        tagName: this.tagNameFetched,
        pageNameKey: this.pageNameKey
      }
    },
    tagNameFetched () {
      return this.tagData?.name
    },
    tagDataArgs () {
      return {
        tagName: this.tagName,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  watch: {
    tagData: 'handleTagDataChange',
    profileLanguage: 'handleProfileLanguageChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    ...mapActions('layout', [
      'setNavigationSections'
    ]),
    handleRefresh (page) {
      this.fetchData(page)
    },
    handleTagDataChange () {
      this.setNavigation()
    },
    handleProfileLanguageChange () {
      this.setNavigation()
    },
    setNavigation () {
      this.setNavigationSections(
        this.navigationSections
      )

      updateTab(
        formatTagPageTab(
          this.navigationData
        )
      )
    },
    fetchTagData,
    fetchData (page) {
      this.fetchTagData({
        ...this.tagDataArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
