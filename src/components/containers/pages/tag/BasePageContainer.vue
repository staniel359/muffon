<template>
  <div>
    <BaseError
      v-if="error"
      :error="error"
      @refresh="handleRefresh"
    />
    <slot
      v-else-if="tagData"
      :isLoading="isLoading"
      :error="error"
      :tagData="tagData"
      :tagName="tagName"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </div>
</template>

<script>
import BaseError from '@/BaseError.vue'
import pageLoadableMixin from '#/mixins/pageLoadable'
import { setNavigationSections } from '#/actions/layout'
import {
  navigation as formatTagPageNavigation
} from '#/formatters/navigation/tag'
import fetchTagData from '#/actions/api/tag/fetchData'

export default {
  name: 'BasePageContainer',
  components: {
    BaseError
  },
  mixins: [
    pageLoadableMixin
  ],
  props: {
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
    isShowLoader () {
      return !this.tagData
    },
    tagName () {
      return (
        this.tagData?.name ||
          this.$route.params.tagName
      )
    },
    navigationSections () {
      return formatTagPageNavigation({
        tagName: this.tagName,
        pageNameKey: this.pageNameKey
      })
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
    tagName: {
      immediate: true,
      handler: 'handleTagNameChange'
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh () {
      this.error = null

      this.fetchData()
    },
    handleTagNameChange () {
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
