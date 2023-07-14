<template>
  <BaseIcon
    class="small grey base-private-icon"
    icon="private"
  />
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'BasePrivateIcon',
  components: {
    BaseIcon
  }
}
</script>

<style lang="sass" scoped>
.base-private-icon
  @extend .no-margin
  margin-left: 0.5em !important
</style>
