<template>
  <BaseTabsContainer
    class="settings-group-tabs-container"
    :tabs="tabsFormatted"
    is-vertical
  >
    <template
      v-for="(tabData, index) in tabsFormatted"
      :key="index"
      #[index]="slotProps"
    >
      <Component
        :is="tabData.component"
        class="settings-group-tab"
        :class="slotProps.class"
      />
    </template>
  </BaseTabsContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseTabsContainer
  from '@/components/containers/tabs/BaseTabsContainer.vue'
import InterfaceOptions from './AppSettings/InterfaceOptions.vue'
import ThemeOptions from './AppSettings/ThemeOptions.vue'
import WindowOptions from './AppSettings/WindowOptions.vue'
import TabsOptions from './AppSettings/TabsOptions.vue'
import SidebarOptions from './AppSettings/SidebarOptions.vue'
import HomePageOptions from './AppSettings/HomePageOptions.vue'
import SearchOptions from './AppSettings/SearchOptions.vue'
import PlayerOptions from './AppSettings/PlayerOptions.vue'
import QueueOptions from './AppSettings/QueueOptions.vue'
import VideoOptions from './AppSettings/VideoOptions.vue'
import RecommendationsOptions from './AppSettings/RecommendationsOptions.vue'
import TopOptions from './AppSettings/TopOptions.vue'
import LyricsOptions from './AppSettings/LyricsOptions.vue'
import HistoryOptions from './AppSettings/HistoryOptions.vue'
import SystemOptions from './AppSettings/SystemOptions.vue'
import UpdatesOptions from './AppSettings/UpdatesOptions.vue'

export default {
  name: 'AppSettings',
  components: {
    BaseTabsContainer,
    InterfaceOptions,
    ThemeOptions,
    WindowOptions,
    TabsOptions,
    SidebarOptions,
    HomePageOptions,
    SearchOptions,
    PlayerOptions,
    QueueOptions,
    VideoOptions,
    RecommendationsOptions,
    TopOptions,
    LyricsOptions,
    HistoryOptions,
    SystemOptions,
    UpdatesOptions
  },
  data () {
    return {
      tabs: [
        {
          nameCode:
            'settings.sections.interface',
          icon: 'interface',
          scope: 'interface',
          component: 'InterfaceOptions',
          isGuest: true
        },
        {
          nameCode:
            'settings.sections.theme',
          icon: 'theme',
          scope: 'theme',
          component: 'ThemeOptions',
          isGuest: true
        },
        {
          nameCode:
            'settings.sections.window',
          icon: 'window',
          scope: 'window',
          component: 'WindowOptions',
          isGuest: true
        },
        {
          nameCode:
            'settings.sections.tabs',
          icon: 'tabs',
          scope: 'tabs',
          component: 'TabsOptions',
          isGuest: true
        },
        {
          nameCode:
            'settings.sections.sidebar',
          icon: 'sidebar',
          scope: 'sidebar',
          component: 'SidebarOptions',
          isGuest: true
        },
        {
          nameCode: 'navigation.home',
          icon: 'home',
          scope: 'home',
          component: 'HomePageOptions',
          isGuest: true
        },
        {
          nameCode: 'navigation.search',
          icon: 'search',
          scope: 'search',
          component: 'SearchOptions',
          isGuest: true
        },
        {
          nameCode: 'navigation.player',
          icon: 'player',
          scope: 'player',
          component: 'PlayerOptions',
          isGuest: true
        },
        {
          nameCode: 'navigation.queue',
          icon: 'queue',
          scope: 'queue',
          component: 'QueueOptions',
          isGuest: true
        },
        {
          nameCode: 'navigation.videos',
          icon: 'video',
          scope: 'video',
          component: 'VideoOptions',
          isGuest: true
        },
        {
          nameCode:
            'navigation.recommendations',
          icon: 'recommendation',
          scope: 'recommendations',
          component:
            'RecommendationsOptions',
          isGuest: false
        },
        {
          nameCode: 'navigation.top',
          icon: 'top',
          scope: 'top',
          component: 'TopOptions',
          isGuest: true
        },
        {
          nameCode: 'navigation.lyrics',
          icon: 'lyrics',
          scope: 'lyrics',
          component: 'LyricsOptions',
          isGuest: true
        },
        {
          nameCode: 'navigation.history',
          icon: 'history',
          scope: 'history',
          component: 'HistoryOptions',
          isGuest: true
        },
        {
          nameCode:
            'settings.sections.system',
          icon: 'system',
          scope: 'system',
          component: 'SystemOptions',
          isGuest: true
        },
        {
          nameCode:
            'settings.sections.updates',
          icon: 'updates',
          scope: 'updates',
          component: 'UpdatesOptions',
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
