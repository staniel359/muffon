<template>
  <BaseTrackContainer
    class="track-section"
    :track-data="firstTrackData"
    :queue-tracks="tracksCollection"
    is-exact-track
  >
    <template
      #default="slotProps"
    >
      <BaseButtonContainer
        class="basic main-simple-button play-button height-100 background-transparent"
      >
        <BaseTrackAudioIcon
          class="main-icon"
          :is-loading="slotProps.isLoading"
          :is-error="slotProps.isError"
          :is-current="slotProps.isCurrent"
        />
      </BaseButtonContainer>
    </template>
  </BaseTrackContainer>
</template>

<script>
import BaseButtonContainer
  from '@/components/containers/buttons/BaseButtonContainer.vue'
import BaseTrackContainer
  from '@/components/containers/track/BaseTrackContainer.vue'
import BaseTrackAudioIcon
  from '@/components/models/track/BaseTrackAudioIcon.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

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
    firstTrackData () {
      return this.tracksCollection[0]
    },
    tracksCollection () {
      return formatCollection(
        [
          this.trackData
        ]
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
