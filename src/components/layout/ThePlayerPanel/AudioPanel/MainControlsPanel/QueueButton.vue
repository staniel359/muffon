<template>
  <div
    class="ui tiny compact icon button queue-button"
    :class="{
      disabled: !queueTracksCount,
      basic: !isQueuePanelVisible
    }"
    @click="handleClick"
  >
    <i class="list ul icon" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { toggleQueuePanel } from '#/actions/layout'

export default {
  name: 'QueueButton',
  computed: {
    ...mapGetters('queue', {
      queueTracksCount: 'tracksCount'
    }),
    ...mapState('layout', [
      'isQueuePanelVisible'
    ])
  },
  methods: {
    handleClick () {
      toggleQueuePanel()
    }
  }
}
</script>

<style lang="sass" scoped>
.queue-button
  @extend .no-margin
</style>
