<template>
  <BaseButton
    class="tiny compact"
    icon="list ul"
    :class="{
      disabled: !queueTracksCount,
      basic: !isQueuePanelVisible
    }"
    @click="handleClick"
  />
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import BaseButton from '@/buttons/BaseButton.vue'
import { toggleQueuePanel } from '#/actions/layout'

export default {
  name: 'QueueButton',
  components: {
    BaseButton
  },
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

<style lang="sass" scoped></style>
