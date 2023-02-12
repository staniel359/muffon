<template>
  <BasePageContainer
    :response-data="historyData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :history-data="historyData"
      :is-loading="isLoading"
      :error="error"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '@/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '@/mixins/navigationMixin'
import formatHistoryPageNavigation
  from '@/helpers/formatters/navigation/history'
import formatHistoryPageTab from '@/helpers/formatters/tabs/history'
import getHistory from '@/helpers/actions/api/history/get'

export default {
  name: 'BaseHistoryPageContainer',
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
    limit: Number,
    order: String
  },
  data () {
    return {
      historyData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatHistoryPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        scope: this.scope
      }
    },
    tabData () {
      return formatHistoryPageTab(
        this.navigationData
      )
    },
    historyArgs () {
      return {
        scope: this.scope,
        limit: this.limit,
        order: this.order
      }
    }
  },
  watch: {
    historyData:
      'handleNavigationDataChange'
  },
  mounted () {
    if (this.isGetData) {
      this.getData()
    } else {
      this.historyData = {}
    }
  },
  methods: {
    getHistory,
    getData (
      {
        page
      } = {}
    ) {
      this.getHistory(
        {
          ...this.historyArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
