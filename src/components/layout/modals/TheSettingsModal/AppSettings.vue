<template>
  <BaseTabsContainer
    class="settings-group-tabs-container"
    :tabs="tabs"
    :is-pointing="false"
    is-vertical
  >
    <template
      v-for="(tabData, index) in tabs"
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
import BaseTabsContainer
  from '*/components/containers/tabs/BaseTabsContainer.vue'
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
    DataOptions
  },
  data () {
    return {
      tabs: [
        {
          nameCode:
            'settings.sections.app.interface',
          scope: 'interface',
          component: 'InterfaceOptions'
        },
        {
          nameCode:
            'settings.sections.app.theme',
          scope: 'theme',
          component: 'ThemeOptions'
        },
        {
          nameCode:
            'settings.sections.app.window',
          scope: 'window',
          component: 'WindowOptions'
        },
        {
          nameCode:
            'settings.sections.app.tabs',
          scope: 'tabs',
          component: 'TabsOptions'
        },
        {
          nameCode:
            'settings.sections.app.sidebar',
          scope: 'sidebar',
          component: 'SidebarOptions'
        },
        {
          nameCode:
            'settings.sections.app.search',
          scope: 'search',
          component: 'SearchOptions'
        },
        {
          nameCode:
            'settings.sections.app.player',
          scope: 'player',
          component: 'PlayerOptions'
        },
        {
          nameCode:
            'settings.sections.app.queue',
          scope: 'queue',
          component: 'QueueOptions'
        },
        {
          nameCode:
            'settings.sections.app.video',
          scope: 'video',
          component: 'VideoOptions'
        },
        {
          nameCode:
            'settings.sections.app.recommendations',
          scope: 'recommendations',
          component: 'RecommendationsOptions'
        },
        {
          nameCode:
            'settings.sections.app.data',
          scope: 'data',
          component: 'DataOptions'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>
