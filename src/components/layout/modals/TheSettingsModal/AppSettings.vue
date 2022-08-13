<template>
  <div>
    <ViewOptions />

    <SearchOptions />

    <PlayerOptions />

    <QueueOptions />

    <VideoOptions />

    <RecommendationsOptions />

    <DataOptions />

    <OtherOptions />
  </div>
</template>

<script>
import ViewOptions from './AppSettings/ViewOptions.vue'
import SearchOptions from './AppSettings/SearchOptions.vue'
import PlayerOptions from './AppSettings/PlayerOptions.vue'
import QueueOptions from './AppSettings/QueueOptions.vue'
import VideoOptions from './AppSettings/VideoOptions.vue'
import RecommendationsOptions from './AppSettings/RecommendationsOptions.vue'
import DataOptions from './AppSettings/DataOptions.vue'
import OtherOptions from './AppSettings/OtherOptions.vue'

export default {
  name: 'AppSettings',
  components: {
    ViewOptions,
    SearchOptions,
    PlayerOptions,
    QueueOptions,
    VideoOptions,
    RecommendationsOptions,
    DataOptions,
    OtherOptions
  }
}
</script>

<style lang="sass" scoped></style>
