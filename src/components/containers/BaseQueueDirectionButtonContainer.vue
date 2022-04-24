<template>
  <BaseButton
    class="tiny compact"
    :icon="icon"
    :class="{
      disabled: isDisabled,
      loading: isGetting,
      basic: !isGetting
    }"
    @click="handleClick"
  />
</template>

<script>
import {
  mapState,
  mapGetters
} from 'vuex'
import BaseButton from '*/components/buttons/BaseButton.vue'
import getQueueTrack from '*/helpers/actions/queue/track/get'

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
      'queue',
      {
        isQueueGettingPrev: 'isGettingPrev',
        isQueueGettingNext: 'isGettingNext'
      }
    ),
    ...mapGetters(
      'queue',
      {
        queueTracksCount: 'tracksCount',
        isQueueStart: 'isStart',
        isQueueEnd: 'isEnd'
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
      switch (this.position) {
        case 'prev':
          return this.isQueueStart
        case 'next':
          return this.isQueueEnd
        default:
          return false
      }
    },
    isGetting () {
      switch (this.position) {
        case 'prev':
          return this.isQueueGettingPrev
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
