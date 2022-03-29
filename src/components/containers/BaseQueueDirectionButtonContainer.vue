<template>
  <BaseButton
    class="tiny compact"
    :icon="icon"
    :class="{
      disabled: isDisabled,
      loading: isFetching,
      basic: !isFetching
    }"
    @click="handleClick"
  />
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
    ...mapState('queue', {
      isQueueFetchingPrev: 'isFetchingPrev',
      isQueueFetchingNext: 'isFetchingNext'
    }),
    ...mapGetters('queue', {
      queueTracksCount: 'tracksCount',
      isQueueStart: 'isStart',
      isQueueEnd: 'isEnd'
    }),
    isDisabled () {
      return (
        !this.queueTracksCount ||
          this.isEdge ||
          this.isFetching
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
    isFetching () {
      switch (this.position) {
        case 'prev':
          return this.isQueueFetchingPrev
        case 'next':
          return this.isQueueFetchingNext
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
