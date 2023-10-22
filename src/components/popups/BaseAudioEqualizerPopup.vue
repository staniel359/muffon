<template>
  <BaseSegmentContainer
    class="main-popup-content-container"
  >
    <BaseAudioEqualizer />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseAudioEqualizer from '@/components/audio/BaseAudioEqualizer.vue'

export default {
  name: 'BaseAudioEqualizerPopup',
  components: {
    BaseSegmentContainer,
    BaseAudioEqualizer
  }
}
</script>

<style lang="sass" scoped></style>
