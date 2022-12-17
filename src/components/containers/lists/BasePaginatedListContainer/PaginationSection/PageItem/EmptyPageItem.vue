<template>
  <div
    class="item"
    :class="{
      disabled: isDisabled
    }"
  >
    <BaseIcon
      class="small direction-icon"
      icon="dotsHorizontal"
    />
  </div>
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'

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
