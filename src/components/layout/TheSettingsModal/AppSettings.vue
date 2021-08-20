<template>
  <div>
    <ViewOptions />
    <PlayerOptions />
    <QueueOptions />
  </div>
</template>

<script>
import ViewOptions from './AppSettings/ViewOptions.vue'
import PlayerOptions from './AppSettings/PlayerOptions.vue'
import QueueOptions from './AppSettings/QueueOptions.vue'

export default {
  name: 'AppSettings',
  components: {
    ViewOptions,
    PlayerOptions,
    QueueOptions
  }
}
</script>

<style lang="sass" scoped></style>
