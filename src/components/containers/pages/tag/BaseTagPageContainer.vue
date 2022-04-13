<template>
  <BasePageContainer
    :response-data="tagData"
    :is-loading="isLoading"
    :error="error"
  >
    <template #default="slotProps">
      <slot
        :tag-data="tagData"
        :tag-name="tagNameFetched"
        :profile-id="slotProps.profileId"
        :is-loading="isLoading"
        :error="error"
        :fetch-data="fetchData"
        :refresh="refresh"
      />
    </template>
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatTagPageNavigation from '*/helpers/formatters/navigation/tag'
import formatTagPageTab from '*/helpers/formatters/tabs/tag'
import getTag from '*/helpers/actions/api/tag/get'

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
    limit: Number
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
      return formatTagPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        tagName: this.tagNameFetched,
        scope: this.scope
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
    tagArgs () {
      return {
        tagName: this.tagName,
        scope: this.scope,
        limit: this.limit
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
    getTag,
    fetchData (
      page
    ) {
      this.getTag(
        {
          ...this.tagArgs,
          page
        }
      )
    },
    refresh (
      page
    ) {
      this.fetchData(
        page
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
