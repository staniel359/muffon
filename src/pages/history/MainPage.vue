<template>
  <BaseHistoryPageContainer
    :key="refreshKey"
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
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'MainPage',
  components: {
    BaseHistoryPageContainer,
    BaseTabsSegmentContainer,
    ActivityTab,
    PlayerTab,
    BrowserTab
  },
  mixins: [
    pageMixin
  ],
  data () {
    return {
      tabs: [
        {
          nameCode: 'navigation.activity',
          component: 'ActivityTab',
          isGuest: false
        },
        {
          nameCode: 'navigation.player',
          component: 'PlayerTab',
          isGuest: true
        },
        {
          nameCode: 'navigation.browser',
          component: 'BrowserTab',
          isGuest: true
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
        return this.guestTabs
      }
    },
    guestTabs () {
      return this.tabs.filter(
        this.isGuestTab
      )
    }
  },
  methods: {
    isGuestTab (
      tabData
    ) {
      return tabData.isGuest
    }
  }
}
</script>

<style lang="sass" scoped></style>
