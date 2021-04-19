<template>
  <BaseTrackContainer
    class="ui basic medium icon button track-play-button"
    :trackData="trackData"
    @loadEnd="handleTrackLoadEnd"
  >
    <template #default="trackSlotProps">
      <BaseTrackAudioIcon
        :isLoading="trackSlotProps.isLoading"
        :isError="trackSlotProps.isError"
        :isCurrent="trackSlotProps.isCurrent"
      />
    </template>
  </BaseTrackContainer>
</template>

<script>
import BaseTrackContainer from '@/containers/track/BaseTrackContainer.vue'
import BaseTrackAudioIcon from '@/models/track/BaseTrackAudioIcon.vue'
import { setTracks as setQueueTracks } from '#/actions/queue'

export default {
  name: 'PlayButtonSection',
  components: {
    BaseTrackContainer,
    BaseTrackAudioIcon
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  computed: {
    queueTracks () {
      return [this.trackData]
    }
  },
  methods: {
    handleTrackLoadEnd () {
      setQueueTracks(this.queueTracks)
    }
  }
}
</script>

<style lang="sass" scoped>
.track-play-button
  @extend .d-flex, .align-items-center, .justify-content-center, .no-margin, .no-shadow, .no-padding
  width: 40px
  border-radius: 0
</style>
