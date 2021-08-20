<template>
  <BaseTrackContainer
    :trackData="trackDataFormatted"
    :queueTracks="tracksFormatted"
  >
    <template #default="slotProps">
      <BaseButtonContainer
        class="basic main-button track-play-button"
      >
        <BaseTrackAudioIcon
          :isLoading="slotProps.isLoading"
          :isError="slotProps.isError"
          :isCurrent="slotProps.isCurrent"
        />
      </BaseButtonContainer>
    </template>
  </BaseTrackContainer>
</template>

<script>
import BaseButtonContainer from '@/containers/BaseButtonContainer.vue'
import BaseTrackContainer from '@/containers/track/BaseTrackContainer.vue'
import BaseTrackAudioIcon from '@/models/track/BaseTrackAudioIcon.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'PlayButtonSection',
  components: {
    BaseButtonContainer,
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
  @extend .h-100, .no-margin
  width: $trackPagePlayerPanelHeight
  .icon
    @extend .no-margin
</style>
