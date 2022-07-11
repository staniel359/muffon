<template>
  <div>
    <ViewOptions />

    <PlayerOptions />

    <QueueOptions />

    <RecommendationsOptions />

    <DataOptions />
  </div>
</template>

<script>
import ViewOptions from './AppSettings/ViewOptions.vue'
import PlayerOptions from './AppSettings/PlayerOptions.vue'
import QueueOptions from './AppSettings/QueueOptions.vue'
import RecommendationsOptions from './AppSettings/RecommendationsOptions.vue'
import DataOptions from './AppSettings/DataOptions.vue'

export default {
  name: 'AppSettings',
  components: {
    ViewOptions,
    PlayerOptions,
    QueueOptions,
    RecommendationsOptions,
    DataOptions
  }
}
</script>

<style lang="sass" scoped></style>
