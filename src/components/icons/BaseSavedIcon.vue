<template>
  <div class="base-saved-icon">
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
.base-saved-icon
  &.right
    margin-left: 0.75em
</style>
