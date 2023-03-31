<template>
  <BasePageContainer
    :response-data="historyData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :history-data="historyData"
      :response-page-limit="responsePageLimit"
      :is-loading="isLoading"
      :error="error"
    />
  </BasePageContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BasePageContainer
  from '@/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '@/mixins/navigationMixin'
import formatHistoryPageNavigation
  from '@/helpers/formatters/navigation/history'
import formatHistoryPageTab from '@/helpers/formatters/tabs/history'
import getRemoteHistory from '@/helpers/actions/api/history/get'
import getLocalHistory from '@/helpers/actions/local/history/get'

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
    listScope: String,
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
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
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
        listScope: this.listScope,
        limit: this.limit,
        order: this.order
      }
    },
    responsePageLimit () {
      if (this.profileId) {
        return null
      } else {
        return this.historyData?.[
          this.listScope
        ]?.length
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
    getRemoteHistory,
    getLocalHistory,
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
    },
    getHistory (
      args
    ) {
      if (this.profileId) {
        return this.getRemoteHistory(
          args
        )
      } else {
        return this.getLocalHistory(
          args
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
