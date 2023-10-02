<template>
  <div class="base-saved-icon main-icon">
    <BaseIcon
      icon="savedTrack"
    />
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'BaseSavedIcon',
  components: {
    BaseIcon
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/Shared.sass'

.base-saved-icon
  &.right
    @extend .main-right-small-icon
</style>
