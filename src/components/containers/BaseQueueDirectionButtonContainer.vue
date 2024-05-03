<template>
  <BaseButton
    class="circular compact simple"
    :icon="icon"
    :class="{
      disabled: isDisabled,
      loading: isGetting,
      basic: !isGetting
    }"
    is-icon-with-rtl
    @click="handleClick"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import queueStore from '@/stores/queue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import getQueueTrack from '@/helpers/actions/queue/track/get'

export default {
  name: 'BaseQueueDirectionButtonContainer',
  components: {
    BaseButton
  },
  props: {
    direction: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(
      queueStore,
      {
        isQueueDirectionAvailable:
          'isDirectionAvailable',
        isQueueGettingDirection:
          'isGettingDirection'
      }
    ),
    isDisabled () {
      return !this.isQueueDirectionAvailable[
        this.direction
      ]
    },
    isGetting () {
      return this.isQueueGettingDirection[
        this.direction
      ]
    },
    queueTrackArgs () {
      return {
        direction: this.direction
      }
    }
  },
  methods: {
    handleClick () {
      getQueueTrack(
        this.queueTrackArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
