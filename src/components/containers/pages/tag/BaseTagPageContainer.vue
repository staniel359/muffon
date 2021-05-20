<template>
  <BasePageContainer
    :isShowLoader="!tagData"
    :isLoading="isLoading"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="tagData"
      :isLoading="isLoading"
      :error="error"
      :tagData="tagData"
      :tagName="tagNameFormatted"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/BasePageContainer.vue'
import { setNavigationSections } from '#/actions/layout'
import {
  navigation as formatTagPageNavigation
} from '#/formatters/navigation/tag'
import fetchTagData from '#/actions/api/tag/fetchData'

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
    navigationSections () {
      return formatTagPageNavigation({
        tagName: this.tagNameFormatted,
        pageNameKey: this.pageNameKey
      })
    },
    tagNameFormatted () {
      return (
        this.tagData?.name ||
          this.tagName
      )
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
    tagNameFormatted: {
      immediate: true,
      handler: 'handleNavigationDataChange'
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.error = null

      this.fetchData(page)
    },
    handleNavigationDataChange () {
      this.setNavigation()
    },
    setNavigation () {
      setNavigationSections(
        this.navigationSections
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
