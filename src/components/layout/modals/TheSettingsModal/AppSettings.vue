<template>
  <div>
    <MainOptions />
    <ViewOptions />
    <PlayerOptions />
    <QueueOptions />
    <DataOptions />
  </div>
</template>

<script>
import MainOptions from './AppSettings/MainOptions.vue'
import ViewOptions from './AppSettings/ViewOptions.vue'
import PlayerOptions from './AppSettings/PlayerOptions.vue'
import QueueOptions from './AppSettings/QueueOptions.vue'
import DataOptions from './AppSettings/DataOptions.vue'

export default {
  name: 'AppSettings',
  components: {
    MainOptions,
    ViewOptions,
    PlayerOptions,
    QueueOptions,
    DataOptions
  }
}
</script>

<style lang="sass" scoped></style>
