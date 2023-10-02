<template>
  <BaseButton
    class="circular compact simple"
    icon="audioLoop"
    :class="buttonClass"
    :is-invertable="!isActive"
    @click="handleClick"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import queueStore from '@/stores/queue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import {
  update as updateGlobalStore
} from '@/helpers/actions/store/global'

export default {
  name: 'LoopButton',
  components: {
    BaseButton
  },
  computed: {
    ...mapState(
      queueStore,
      {
        isQueueLoop: 'isLoop'
      }
    ),
    isActive () {
      return this.isQueueLoop
    },
    buttonClass () {
      if (this.isActive) {
        return 'primary'
      } else {
        return 'basic'
      }
    }
  },
  methods: {
    handleClick () {
      updateGlobalStore(
        {
          'queue.isLoop':
            !this.isQueueLoop
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
