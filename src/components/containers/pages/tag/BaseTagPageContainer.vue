<template>
  <BasePageContainer
    :response-data="tagData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :tag-data="tagData"
      :tag-name="responseTagName"
      :is-loading="isLoading"
      :error="error"
    />
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
      tagData: null,
      error: null,
      isLoading: false
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
        tagName: this.responseTagName,
        scope: this.scope
      }
    },
    tabData () {
      return formatTagPageTab(
        this.navigationData
      )
    },
    responseTagName () {
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
    this.getData()
  },
  methods: {
    getTag,
    getData (
      {
        page
      } = {}
    ) {
      this.getTag(
        {
          ...this.tagArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
