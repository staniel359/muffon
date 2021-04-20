<template>
  <BaseTrackContainer
    class="ui basic medium icon button track-play-button"
    :trackData="trackDataFormatted"
    :queueTracks="tracksFormatted"
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
import { collection as formatCollection } from '#/formatters'

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
    trackDataFormatted () {
      return this.tracksFormatted[0]
    },
    tracksFormatted () {
      return formatCollection(
        [this.trackData]
      )
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
