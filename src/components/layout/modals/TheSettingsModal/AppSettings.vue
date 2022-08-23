<template>
  <div>
    <InterfaceOptions />

    <ThemeOptions />

    <WindowOptions />

    <TabsOptions />

    <SidebarOptions />

    <SearchOptions />

    <PlayerOptions />

    <QueueOptions />

    <VideoOptions />

    <RecommendationsOptions />

    <DataOptions />
  </div>
</template>

<script>
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
  }
}
</script>

<style lang="sass" scoped></style>
