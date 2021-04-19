<template>
  <div
    class="ui tiny compact icon button"
    :class="{
      disabled: isDisabled,
      loading: isFetching,
      basic: !isFetching
    }"
    @click="handleClick"
  >
    <i
      class="icon"
      :class="icon"
    />
  </div>
</template>

<script>
import {
  getIsEdge as getIsQueueEdge,
  getIsFetching as getIsQueueFetching
} from '#/actions/queue'
import fetchQueueTrackData from '#/actions/queue/track/fetchData'

export default {
  name: 'BaseQueueDirectionButtonContainer',
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
    isDisabled () {
      return this.isEdge || this.isFetching
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
      this.fetchQueueTrack()
    },
    fetchQueueTrackData,
    fetchQueueTrack () {
      this.fetchQueueTrackData({
        position: this.position
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
