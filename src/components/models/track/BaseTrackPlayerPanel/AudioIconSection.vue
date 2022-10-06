<template>
  <div class="track-section">
    <BaseIcon
      class="audio-icon"
      icon="music"
    />
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'AudioIconSection',
  components: {
    BaseIcon
  }
}
</script>

<style lang="sass" scoped>
.track-section
  @extend .d-flex, .align-items-center
  padding: 0 1em

.audio-icon
  @extend .no-margin
</style>
