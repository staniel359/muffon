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
import SearchOptions from './AppSettings/SearchOptions.vue'
import PlayerOptions from './AppSettings/PlayerOptions.vue'
import QueueOptions from './AppSettings/QueueOptions.vue'
import VideoOptions from './AppSettings/VideoOptions.vue'
import RecommendationsOptions from './AppSettings/RecommendationsOptions.vue'
import TopOptions from './AppSettings/TopOptions.vue'
import LyricsOptions from './AppSettings/LyricsOptions.vue'
import DataOptions from './AppSettings/DataOptions.vue'

export default {
  name: 'AppSettings',
  components: {
    BaseTabsContainer,
    InterfaceOptions,
    ThemeOptions,
    WindowOptions,
    TabsOptions,
    SidebarOptions,
    SearchOptions,
    PlayerOptions,
    QueueOptions,
    VideoOptions,
    RecommendationsOptions,
    TopOptions,
    LyricsOptions,
    DataOptions
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
          isAnonymous: true
        },
        {
          nameCode:
            'settings.sections.theme',
          icon: 'theme',
          scope: 'theme',
          component: 'ThemeOptions',
          isAnonymous: true
        },
        {
          nameCode:
            'settings.sections.window',
          icon: 'window',
          scope: 'window',
          component: 'WindowOptions',
          isAnonymous: true
        },
        {
          nameCode:
            'settings.sections.tabs',
          icon: 'tabs',
          scope: 'tabs',
          component: 'TabsOptions',
          isAnonymous: true
        },
        {
          nameCode:
            'settings.sections.sidebar',
          icon: 'sidebar',
          scope: 'sidebar',
          component: 'SidebarOptions',
          isAnonymous: true
        },
        {
          nameCode: 'navigation.search',
          icon: 'search',
          scope: 'search',
          component: 'SearchOptions',
          isAnonymous: true
        },
        {
          nameCode: 'navigation.player',
          icon: 'player',
          scope: 'player',
          component: 'PlayerOptions',
          isAnonymous: true
        },
        {
          nameCode: 'navigation.queue',
          icon: 'queue',
          scope: 'queue',
          component: 'QueueOptions',
          isAnonymous: true
        },
        {
          nameCode: 'navigation.videos',
          icon: 'video',
          scope: 'video',
          component: 'VideoOptions',
          isAnonymous: true
        },
        {
          nameCode:
            'navigation.recommendations',
          icon: 'recommendation',
          scope: 'recommendations',
          component:
            'RecommendationsOptions',
          isAnonymous: false
        },
        {
          nameCode: 'navigation.top',
          icon: 'top',
          scope: 'top',
          component: 'TopOptions',
          isAnonymous: true
        },
        {
          nameCode: 'navigation.lyrics',
          icon: 'lyrics',
          scope: 'lyrics',
          component: 'LyricsOptions',
          isAnonymous: true
        },
        {
          nameCode:
            'settings.sections.data',
          icon: 'data',
          scope: 'data',
          component: 'DataOptions',
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
