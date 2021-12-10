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
import { mapState } from 'vuex'
import BasePageContainer from '@/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatTagPageNavigation from '#/formatters/navigation/tag'
import formatTagPageTab from '#/formatters/tabs/tag'
import fetchTagData from '#/actions/api/tag/fetchData'

export default {
  name: 'BaseTagPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
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
      profileInfo: 'info'
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
    tabData () {
      return formatTagPageTab(
        this.navigationData
      )
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
    tagData: 'handleNavigationDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
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
