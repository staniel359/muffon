<template>
  <div class="track-section middle-aligned">
    <BaseIcon
      class="main-icon"
      icon="audio"
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
  padding: 0 1rem
</style>
