<template>
  <BasePageContainer
    :response-data="topData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :top-data="topData"
      :is-loading="isLoading"
      :error="error"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatTopPageNavigation from '*/helpers/formatters/navigation/top'
import formatTopPageTab from '*/helpers/formatters/tabs/top'
import getTop from '*/helpers/actions/api/top/get'

export default {
  name: 'BaseTopPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    isGetData: {
      type: Boolean,
      default: true
    },
    scope: String,
    country: String,
    limit: Number
  },
  data () {
    return {
      topData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatTopPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        scope: this.scope
      }
    },
    tabData () {
      return formatTopPageTab(
        this.navigationData
      )
    },
    topArgs () {
      return {
        scope: this.scope,
        country: this.country,
        limit: this.limit
      }
    }
  },
  mounted () {
    this.setNavigation()

    if (this.isGetData) {
      this.getData()
    } else {
      this.topData = {}
    }
  },
  methods: {
    getTop,
    getData (
      {
        page
      } = {}
    ) {
      this.getTop(
        {
          ...this.topArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
