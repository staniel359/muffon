<template>
  <BasePaginatedTabContainer
    :response-data="historyData"
    :scope="listScope"
    :limit="limit"
    :response-page-limit="responsePageLimit"
    :is-loading="isLoading"
    :error="error"
    :is-active="isActive"
    :more-link="moreLink"
    @focus="handleFocus"
    @activate="handleActivate"
  >
    <template
      #default="slotProps"
    >
      <slot
        :[listScope]="slotProps[listScope]"
      />
    </template>
  </BasePaginatedTabContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import tabContainerMixin from '@/mixins/tabContainerMixin'
import getRemoteHistory from '@/helpers/actions/api/history/get'
import getLocalHistory from '@/helpers/actions/local/history/get'
import {
  activity as formatHistoryActivityLink,
  player as formatHistoryPlayerLink,
  browser as formatHistoryBrowserLink
} from '@/helpers/formatters/links/history'

export default {
  name: 'BaseHistoryTabContainer',
  mixins: [
    tabContainerMixin
  ],
  props: {
    listScope: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      historyData: null
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    historyArgs () {
      return {
        scope: this.scope,
        listScope: this.listScope,
        limit: this.limit,
        order: 'createdDesc'
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
    },
    moreLink () {
      switch (this.scope) {
        case 'activity':
          return formatHistoryActivityLink()
        case 'player':
          return formatHistoryPlayerLink()
        case 'browser':
          return formatHistoryBrowserLink()
        default:
          return {}
      }
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
