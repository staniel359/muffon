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
import { mapGetters } from 'vuex'
import BaseButton from '@/BaseButton.vue'
import {
  getIsEdge as getIsQueueEdge,
  getIsFetching as getIsQueueFetching
} from '#/actions/queue'
import fetchQueueTrack from '#/actions/queue/track/fetchData'

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
    ...mapGetters('queue', {
      queueTracksCount: 'tracksCount'
    }),
    isDisabled () {
      return (
        !this.queueTracksCount ||
          this.isEdge ||
          this.isFetching
      )
    },
    isEdge () {
      return getIsQueueEdge({
        position: this.position
      })
    },
    isFetching () {
      return getIsQueueFetching({
        position: this.position
      })
    }
  },
  methods: {
    handleClick () {
      fetchQueueTrack({
        position: this.position
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
