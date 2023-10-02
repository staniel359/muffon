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
    position: {
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
        isQueueGettingPrevious: 'isGettingPrevious',
        isQueueGettingNext: 'isGettingNext',
        queueTracksCount: 'tracksCount',
        isQueueStart: 'isStart',
        isQueueEnd: 'isEnd',
        isQueueLoop: 'isLoop'
      }
    ),
    isDisabled () {
      return (
        !this.queueTracksCount ||
          this.isEdge ||
          this.isGetting
      )
    },
    isEdge () {
      if (this.isQueueLoop) {
        return false
      } else {
        switch (this.position) {
          case 'previous':
            return this.isQueueStart
          case 'next':
            return this.isQueueEnd
          default:
            return false
        }
      }
    },
    isGetting () {
      switch (this.position) {
        case 'previous':
          return this.isQueueGettingPrevious
        case 'next':
          return this.isQueueGettingNext
        default:
          return false
      }
    },
    queueTrackArgs () {
      return {
        position: this.position
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
