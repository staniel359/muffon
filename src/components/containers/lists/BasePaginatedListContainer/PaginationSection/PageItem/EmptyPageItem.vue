<template>
  <div
    class="item"
    :class="{
      disabled: isDisabled
    }"
  >
    <BaseIcon
      class="direction-icon"
      icon="small ellipsis horizontal"
    />
  </div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue'

export default {
  name: 'EmptyPageItem',
  components: {
    BaseIcon
  },
  props: {
    isDisabled: Boolean
  }
}
</script>

<style lang="sass" scoped></style>
