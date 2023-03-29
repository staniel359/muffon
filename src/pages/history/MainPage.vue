<template>
  <BaseHistoryPageContainer
    :is-get-data="false"
  >
    <BaseTabsSegmentContainer
      :tabs="tabsFormatted"
    >
      <template
        #default="slotProps"
      >
        <Component
          :is="slotProps.component"
          :class="slotProps.class"
          :is-active="slotProps.isActive"
          @focus="slotProps.handleFocus"
        />
      </template>
    </BaseTabsSegmentContainer>
  </BaseHistoryPageContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseHistoryPageContainer
  from '@/components/containers/pages/history/BaseHistoryPageContainer.vue'
import BaseTabsSegmentContainer
  from '@/components/containers/segments/tabs/BaseTabsSegmentContainer.vue'
import ActivityTab from './MainPage/ActivityTab.vue'
import PlayerTab from './MainPage/PlayerTab.vue'
import BrowserTab from './MainPage/BrowserTab.vue'

export default {
  name: 'MainPage',
  components: {
    BaseHistoryPageContainer,
    BaseTabsSegmentContainer,
    ActivityTab,
    PlayerTab,
    BrowserTab
  },
  data () {
    return {
      tabs: [
        {
          nameCode: 'navigation.activity',
          component: 'ActivityTab',
          isAnonymous: false
        },
        {
          nameCode: 'navigation.player',
          component: 'PlayerTab',
          isAnonymous: true
        },
        {
          nameCode: 'navigation.browser',
          component: 'BrowserTab',
          isAnonymous: true
        }
      ]
    }
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    tabsFormatted () {
      if (this.profileId) {
        return this.tabs
      } else {
        return this.anonymousTabs
      }
    },
    anonymousTabs () {
      return this.tabs.filter(
        this.isAnonymousTab
      )
    }
  },
  methods: {
    isAnonymousTab (
      tabData
    ) {
      return tabData.isAnonymous
    }
  }
}
</script>

<style lang="sass" scoped></style>
